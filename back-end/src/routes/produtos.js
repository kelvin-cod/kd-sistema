const express = require('express');
const router = express.Router();
const controller = require('../controllers/produtos');

router.get('/listar', controller.listar);
router.post('/criar', controller.criar);
router.post('/listarum/:id', controller.listarUm);
router.put('/atualizar/:id', controller.atualizar);
router.post('/excluirum/:id', controller.excluirUm);

router.get('/fornecedor', controller.pegarFornecedor);

module.exports = router;