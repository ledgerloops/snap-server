# snap-server
Basic server running SNAP ledgers behind a Hubbie server. Used (as an initial test case to guide development) to keep track of the ToS;DR project finance. Requires postgres and node.

```sh
sudo su - postgres
| createuser snap --pwprompt
| | Enter password for new role: snap
| | Enter it again: snap
| createdb -O snap snap
| exit
psql postgresql://snap:snap@localhost/snap < schema.db
psql postgresql://snap:snap@localhost/snap < finance-2018-q4.sql
npm install
DATABASE_URL=postgresql://snap:snap@localhost/snap npm start
```
