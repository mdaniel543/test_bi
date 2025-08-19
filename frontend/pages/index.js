import { useState, useEffect } from 'react';
import Head from 'next/head';
import ClienteForm from '../components/ClienteForm';
import ClientesList from '../components/ClientesList';
import { clienteService } from '../services/api';

export default function Home() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [clienteEditar, setClienteEditar] = useState(null);

  const cargarClientes = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await clienteService.obtenerClientes();
      setClientes(data.data);
    } catch (err) {
      setError(err.message || 'Error al cargar clientes');
    } finally {
      setLoading(false);
    }
  };

  console.log('Clientes cargados:', clientes);

  useEffect(() => {
    cargarClientes();
  }, []);


  const handleCancelEdit = () => {
    setClienteEditar(null);
  };

  const handleClienteCreated = () => {
    cargarClientes();
  };

  const handleEditCliente = (cliente) => {
    console.log('Editar cliente:', cliente);
    setClienteEditar(cliente);
  };

  return (
    <>
      <Head>
        <title>Test BI - Gestión de Clientes</title>
        <meta name="description" content="Sistema de gestión de clientes con React y Next.js" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container">

        {error && (
          <div className="alert alert-error">
            {error}
            <br />
            <button 
              onClick={cargarClientes}
              className="btn btn-primary"
              style={{ marginTop: '10px', fontSize: '14px' }}
            >
              Reintentar Conexión
            </button>
          </div>
        )}

        <ClienteForm 
          onClienteCreated={handleClienteCreated}
          clienteEditar={clienteEditar}
          onCancelEdit={handleCancelEdit}
        />

        <ClientesList 
            clientes={clientes}
            onEditCliente={handleEditCliente}
            reload={cargarClientes}
        />

      </div>
    </>
  );
}
