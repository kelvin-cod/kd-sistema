const express = require('express');
const router = express.Router();
const controller = require('../controllers/categorias');

router.get('/listar', controller.pegarCategoria);

module.exports = router;