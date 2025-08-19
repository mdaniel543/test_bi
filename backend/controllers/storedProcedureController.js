const StoredProcedureModel = require("../models/StoredProcedure");

class StoredProcedureController {
  // DELETE /api/sp/eliminar-cliente
  static async eliminarCliente(req, res) {
    try {
      const { idCliente } = req.params;
      const result = await StoredProcedureModel.eliminarCliente(idCliente);

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al obtener resumen del cliente",
        error: error.message,
      });
    }
  }

  // POST
  static async crearEditarCliente(req, res) {
    try {
      const { idCliente, nombre } = req.body;

      if (!nombre) {
        return res.status(400).json({
          success: false,
          message: "El nombre es requerido",
        });
      }

      let responseIdCliente = 0;
      let action = "crear";

      const result = await StoredProcedureModel.crearOEditarCliente(
        idCliente,
        nombre,
        responseIdCliente,
        action
      );

      res.json({
        success: true,
        data: result,
        message: "Cliente creado/actualizado exitosamente",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al crear/actualizar cliente",
        error: error.message,
      });
    }
  }

  // GET /api/sp/list
  static async listarClientes(req, res) {
    try {
      const result = await StoredProcedureModel.obtenerClientes();
      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al listar clientes",
        error: error.message,
      });
    }
  }
}

module.exports = StoredProcedureController;
