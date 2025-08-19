const express = require('express');
const StoredProcedureController = require('../controllers/storedProcedureController');

const router = express.Router();

router.delete('/eliminar-cliente/:idCliente', StoredProcedureController.eliminarCliente);
router.post('/crear-editar-cliente', StoredProcedureController.crearEditarCliente);

router.get('/list', StoredProcedureController.listarClientes);

module.exports = router;
