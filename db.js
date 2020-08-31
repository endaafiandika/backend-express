const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "ayobisa",
    database: "kopishop",
    host: "localhost",
    port: 5432
});

module.exports = pool;
