const Agent = require('networkledger').Agent;
const bcrypt = require('bcrypt');
const { Pool } = require('pg');
let pool;
if (typeof process.env.DATABASE_URL == 'string') {
  pool = new Pool({
  connectionString: process.env.DATABASE_URL,
    ssl: true
  });
}
const fs = require('fs');
const port = process.env.PORT || 8123;
const url = process.env.URL || 'ws://localhost:' + port;
const htmlPage = fs.readFileSync('./index.html').toString().split('URL').join(url);

const handler = (req, res) => {
  console.log('handling http', req.url);
  if (req.url == '/') {
    res.writeHead(200);
    res.end(htmlPage);
  } else {
    res.writeHead(404);
    res.end('Page not found');
  }
};

if (typeof process.env.TESTNET_FRIENDS == 'string') {
  process.env.TESTNET_FRIENDS.split(',').map(friendWssUrl => {
    agent.addClient({
      peerUrl: friendWssUrl,
      peerName: friendWssUrl
    });
  });
}

async function runSql(query, params) {
  if (!pool) {
    return null;
  }
  console.log('running sql', query, params);
  try {
    const client = await pool.connect();
    const result = await client.query(query, params);
    const results = (result && result.rowCount) ? result.rows : null;
    console.log('sql results', result, results);
    client.release();
    return results;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
const agent = new Agent('blogger', 'payme', (eventObj) => {
  return runSql('SELECT secretHash FROM users WHERE name=$1', [
    eventObj.peerName
  ]).then(results => {
    console.log('sql query result', results);
    if (results == null) {
      return bcrypt.hash(eventObj.peerSecret, 10).then((hash) => {
        console.log({ hash });
        return runSql('INSERT INTO users (name, secretHash) VALUES ($1, $2)', [
          eventObj.peerName,
          hash
        ]);
      }).then(() => {
        console.log('returning true');
        return true;
      });
    } else {
      const secretHash = results[0].secrethash;
      console.log('returning compare', eventObj, results, eventObj.peerSecret, secretHash);
      return bcrypt.compare(eventObj.peerSecret, secretHash).then(ret => {
        console.log({  ret });
        return ret;
      });
    }
  });
}, runSql);

runSql('SELECT now();').then(result => {
  console.log({ result });
});
console.log('listening on port', port);
agent.listen({ port: parseInt(port), handler });
