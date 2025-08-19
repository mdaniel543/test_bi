import axios from 'axios';

// Configuración base de axios
const api = axios.create({
  baseURL: 'http://localhost:9000',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Interceptor para manejar errores globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Error en la API:', error);
    return Promise.reject(error);
  }
);

export const clienteService = {
  // Crear o editar cliente
  async crearEditarCliente(data) {
    try {
      const response = await api.post('/api/sp/crear-editar-cliente', data);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 
        'Error al crear/editar cliente'
      );
    }
  },

  // Eliminar cliente
  async eliminarCliente(idCliente) {
    try {
      const response = await api.delete('/api/sp/eliminar-cliente/' + idCliente);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 
        'Error al eliminar cliente'
      );
    }
  },

  // Obtener todos los clientes (usando el endpoint regular)
  async obtenerClientes() {
    try {
      const response = await api.get('/api/sp/list');
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 
        'Error al obtener clientes'
      );
    }
  }
};

export default api;
