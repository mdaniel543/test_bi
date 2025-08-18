const express = require('express');
const StoredProcedureController = require('../controllers/storedProcedureController');

const router = express.Router();

router.delete('/eliminar-cliente', StoredProcedureController.eliminarCliente);
router.post('/crear-editar-cliente', StoredProcedureController.crearEditarCliente);

module.exports = router;
