import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { getClientes, type Cliente } from "../../api/cliente";
import DetalhesCliente from "./DetalhesCliente";

interface MeusClientesProps {
  onClose: () => void;
}

const DEFAULT_PHOTO_URL =
  "https://cdn-icons-png.flaticon.com/128/3135/3135715.png";

const getClientPhotoUrl = (dataUrl: string | null | undefined) => {
    if (!dataUrl || dataUrl.trim() === '' || dataUrl.length < 50) { 
        return DEFAULT_PHOTO_URL;
    }
    return dataUrl;
};
const MeusClientes: React.FC<MeusClientesProps> = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getClientes();
        setClientes(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Erro ao carregar clientes.",
        );
      } finally {
        setLoading(false);
      }
    };
    fetchClientes();
  }, []);

  const filteredClientes = clientes.filter(
    (cliente) =>
      cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.telefone.includes(searchTerm),
  );

  return (
    <>
      {ReactDOM.createPortal(
        <div className="modal-overlay" onClick={onClose}>
          <div
            className="modal-sheet modal-sheet-large"
            onClick={(e) => e.stopPropagation()}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <div style={{ flexShrink: 0 }}>
              <div className="modal-grabber" onClick={onClose}></div>
              <h2 className="card__title" style={{ marginTop: 0 }}>
                Meus Clientes
              </h2>

              <div className="form-group">
                <input
                  type="text"
                  placeholder="Buscar Cliente por nome ou telefone"
                  className="form-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div
              className="client-list"
              style={{ flexGrow: 1, overflowY: "auto", minHeight: 0 }}
            >
              {loading && (
                <p style={{ textAlign: "center", padding: "20px" }}>
                  Carregando...
                </p>
              )}
              {error && (
                <p style={{ color: "red", textAlign: "center" }}>{error}</p>
              )}

              {!loading &&
                filteredClientes.map((cliente: Cliente) => (
                  <button
                    key={cliente.id}
                    className="client-list-item"
                    onClick={() => setSelectedClientId(cliente.id)}
                  >
                    <img
                      src={cliente.foto_data_url || DEFAULT_PHOTO_URL}
                      alt={cliente.nome}
                      className="client-photo"
                    />
                    <div className="client-info">
                      <span className="client-info__name">{cliente.nome}</span>
                      <span className="client-info__phone">
                        {cliente.telefone}
                      </span>
                    </div>
                  </button>
                ))}
            </div>
          </div>
        </div>,
        document.getElementById("modal-root")!,
      )}

      {selectedClientId !== null && (
        <DetalhesCliente
          clienteId={selectedClientId}
          onClose={() => setSelectedClientId(null)}
        />
      )}
    </>
  );
};

export default MeusClientes;
