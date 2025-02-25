'use client'

import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_DATABASE_URL || "https://apihiago.onrender.com/clientes";

interface Cliente {
    _id: string;
  id: string;
  name: string;
  email: string;
  password: string;
}

export default function ClientesTable() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingCliente, setEditingCliente] = useState<Cliente | null>(null);
  const [deleteCliente, setDeleteCliente] = useState<Cliente | null>(null)

  useEffect(() => {
    fetchClientes();
  }, []);
  
  const fetchClientes = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Erro ao buscar dados");
      const data: Cliente[] = await response.json();
      setClientes(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };
  
 

  const handleDelete = async (_id: string) => {
    console.log('sfdgknaslkjgnaslgals', _id)
    try {
        const response = await fetch(`${API_URL}/${_id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },

        });
        console.log('akjsdkqshjfkasf', response)
        if (!response.ok) throw new Error("Erro ao excluir cliente");
        fetchClientes();
    }catch (err) {
        alert("Erro ao excluir cliente.");
    }
  }


  const handleEdit = (cliente: Cliente) => {
    setEditingCliente(cliente);
  };

  const handleUpdate = async () => {
    if (!editingCliente) return;
  
    try {
      const response = await fetch(`${API_URL}/${editingCliente._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingCliente),
      });
  
      if (!response.ok) throw new Error("Erro ao atualizar cliente");
      fetchClientes();
      setEditingCliente(null);
    } catch (err) {
      alert("Erro ao atualizar cliente.");
    }
  };
  

  if (loading) return <p className="text-center p-4">Carregando...</p>;
  if (error) return <p className="text-center p-4 text-red-500">Erro: {error}</p>;

  return (
    <div className="overflow-x-auto p-4 text-black">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">NOME</th>
            <th className="border px-4 py-2">EMAIL</th>
            <th className="border px-4 py-2">TELEFONE</th>
            <th className="border px-4 py-2">AÇÕES</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map(cliente => (
            <tr key={cliente.id} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{cliente.name}</td>
              <td className="border px-4 py-2">{cliente.email}</td>
              <td className="border px-4 py-2">{cliente.password}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                  onClick={() => handleEdit(cliente)}
                >
                  Editar
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(cliente._id)}
                >
                  Deletar
                </button>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingCliente && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <h2 className="text-lg font-bold">Editar Cliente</h2>
          <input
            type="text"
            value={editingCliente.name}
            onChange={e => setEditingCliente({ ...editingCliente, name: e.target.value })}
            className="w-full p-2 border rounded mt-2"
            placeholder="Nome"
          />
          <input
            type="email"
            value={editingCliente.email}
            onChange={e => setEditingCliente({ ...editingCliente, email: e.target.value })}
            className="w-full p-2 border rounded mt-2"
            placeholder="Email"
          />
          <input
            type="text"
            value={editingCliente.password}
            onChange={e => setEditingCliente({ ...editingCliente, password: e.target.value })}
            className="w-full p-2 border rounded mt-2"
            placeholder="Telefone"
          />
          <div className="mt-2">
            <button onClick={handleUpdate} className="bg-green-500 text-white px-4 py-2 rounded mr-2">
              Salvar
            </button>
            <button onClick={() => setEditingCliente(null)} className="bg-red-500 text-white px-4 py-2 rounded">
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
