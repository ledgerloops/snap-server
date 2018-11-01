# snap-server
Basic server running SNAP ledgers behind a Hubbie server. Used (as an initial test case to guide development) to keep track of the ToS;DR project finance. Requires postgres and node.

```sh
createdb tosdr_finance
psql tosdr_finance < schema.db
npm install
DATABASE_URL=postgresql://localhost/tosdr_finance npm start
```
