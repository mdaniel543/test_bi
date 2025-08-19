import { useEffect, useState } from 'react';
import { clienteService } from '../services/api';

export default function ClienteForm({ onClienteCreated, clienteEditar, onCancelEdit }) {
  const [formData, setFormData] = useState({
    idCliente: clienteEditar?.idCliente || null,
    nombre: clienteEditar?.nombre || ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.nombre.trim()) {
      setMessage('El nombre es requerido');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const resultado = await clienteService.crearEditarCliente({
        idCliente: formData.idCliente,
        nombre: formData.nombre.trim()
      });

      setMessage(`Cliente ${formData.idCliente ? 'actualizado' : 'creado'} exitosamente`);
      
      // Resetear formulario si es creación
      if (!formData.idCliente) {
        setFormData({ idCliente: null, nombre: '' });
      }
      
      // Notificar al componente padre
      if (onClienteCreated) {
        onClienteCreated();
      }

      // Si estaba editando, cancelar edición
      if (clienteEditar && onCancelEdit) {
        setTimeout(() => {
          onCancelEdit();
        }, 1500);
      }

    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setFormData({ idCliente: null, nombre: '' });
    if (onCancelEdit) {
      onCancelEdit();
    }
  };

  useEffect(() => {
    if (clienteEditar) {
      setFormData({
        idCliente: clienteEditar.idCliente,
        nombre: clienteEditar.nombre
      });
    }
  }, [clienteEditar]);

  return (
    <div className="form-container">
      <h2>
        {formData.idCliente ? 'Editar Cliente' : 'Crear Nuevo Cliente'}
      </h2>
      
      {message && (
        <div className={`alert ${message.includes('exitosamente') ? 'alert-success' : 'alert-error'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre del Cliente:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Ingrese el nombre del cliente"
            disabled={loading}
            required
          />
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Procesando...' : (formData.idCliente ? 'Actualizar Cliente' : 'Crear Cliente')}
          </button>

          {formData.idCliente && (
            <button 
              type="button" 
              className="btn"
              onClick={handleCancelEdit}
              disabled={loading}
              style={{ backgroundColor: '#6c757d', color: 'white' }}
            >
              Cancelar Edición
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
