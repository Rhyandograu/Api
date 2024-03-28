const express = require('express');
const router = express.Router();
const { pool, poolConnect } = require('./db');

router.get('/', async (req, res) => {
    try {
        await poolConnect;
        const result = await pool.request().query('SELECT * FROM Chamados');
        res.json(result.recordset);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar chamados.');
    }
});

router.get('/chamado/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await poolConnect;
        const result = await pool.request().query(`SELECT * FROM Chamados WHERE Id = ${id}`);
        res.json(result.recordset[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar chamado por ID.');
    }
});

router.post('/chamado/novo', async (req, res) => {
    const { data, nomeCliente, descricao } = req.body;
    try {
        await poolConnect;
        await pool.request().query(
            `INSERT INTO Chamados (Data, NomeCliente, Descricao) VALUES ('${data}', '${nomeCliente}', '${descricao}')`
        );
        res.status(201).send('Chamado cadastrado com sucesso.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao cadastrar chamado.');
    }
});

module.exports = router;