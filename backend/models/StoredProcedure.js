const { pool } = require('../config/database');

class StoredProcedureModel {
  static async callProcedure(procedureName, params = []) {
    try {
      const placeholders = params.length > 0 ? '?, '.repeat(params.length).slice(0, -2) : '';
      const query = `CALL ${procedureName}(${placeholders})`;
      
      const [rows] = await pool.execute(query, params);
      return rows;
    } catch (error) {
      console.error(`Error ejecutando SP ${procedureName}:`, error);
      throw error;
    }
  }

  static async crearOEditarCliente(idCliente, nombre, responseIdCliente, action) {
    return await this.callProcedure('sp_crear_editar_cliente', [idCliente, nombre, responseIdCliente, action]);
  }

  static async eliminarCliente(idCliente) {
    return await this.callProcedure('sp_eliminar_cliente', [idCliente]);
  }

  //obtener clientes sin SP
  static async obtenerClientes() {
    const [rows] = await pool.execute('SELECT * FROM cliente');
    return rows;
  }

}

module.exports = StoredProcedureModel;
