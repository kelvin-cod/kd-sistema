const express = require('express');
const router = express.Router();
const controller = require('../controllers/produtos');

router.get('/listar', controller.listar);
router.post('/criar', controller.criar);
router.get('/listarum/:id', controller.listarUm);
router.put('/atualizar/:id', controller.atualizar);

module.exports = router;