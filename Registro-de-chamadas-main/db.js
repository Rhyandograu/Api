const sql = require('mssql');

const config = {
    user: 'seu_usuario',
    password: 'sua_senha',
    server: 'localhost',
    database: 'nome_do_banco_de_dados',
    options: {
        enableArithAbort: true,
    },
};

const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect();

module.exports = { pool, poolConnect };