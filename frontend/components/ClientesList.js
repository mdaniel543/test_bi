import { useState } from "react";
import { clienteService } from "../services/api";

export default function ClientesList({ clientes, onEditCliente, reload }) {
  const handleDelete = async (idCliente) => {
    try {
      await clienteService.eliminarCliente(idCliente);
      reload(); 
    } catch (error) {
      console.error("Error al eliminar cliente:", error);
    }
  };

  return (
    <div>
      <h2>Lista de Clientes</h2>
      <ul>
        {clientes.map((cliente) => (
          <li key={cliente.idCliente}>
            {cliente.nombre}
            <button onClick={() => onEditCliente(cliente)}>Editar</button>
            <button onClick={() => handleDelete(cliente.idCliente)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
