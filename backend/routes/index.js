const express = require('express');

const router = express.Router();

// Importar todas las rutas
const storedProceduresRoutes = require('./storedProcedures');


router.use('/sp', storedProceduresRoutes);

// Ruta de prueba
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API funcionando correctamente',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
