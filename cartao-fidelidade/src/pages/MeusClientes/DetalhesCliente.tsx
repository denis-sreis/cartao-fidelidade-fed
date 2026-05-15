import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { getClienteById, type Cliente } from "../../api/cliente";

interface DetalhesProps {
  clienteId: number;
  onClose: () => void;
}

const DEFAULT_PHOTO_URL =
  "https://cdn-icons-png.flaticon.com/128/3135/3135715.png";

const DetalhesCliente: React.FC<DetalhesProps> = ({ clienteId, onClose }) => {
  const [info, setInfo] = useState<Cliente | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- NOVA FUNCIONALIDADE: Estado para controlar a imagem ampliada ---
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  // ---------------------------------------------------------------------

  useEffect(() => {
    const fetchDados = async () => {
      try {
        setLoading(true);
        setError(null);
        // Busca os dados reais via API (CPF já vem formatado do cliente.ts)
        const dados = await getClienteById(clienteId);
        setInfo(dados);
      } catch (err) {
        console.error("Erro ao carregar detalhes:", err);
        setError("Não foi possível carregar os dados do cliente.");
      } finally {
        setLoading(false);
      }
    };

    fetchDados();
  }, [clienteId]);

  return ReactDOM.createPortal(
    <>
      <div className="modal-overlay" onClick={onClose} style={{ zIndex: 1100 }}>
        {/* Classe modal-sheet idêntica ao modal de fundo */}
        <div
          className="modal-sheet modal-sheet-large"
          onClick={(e) => e.stopPropagation()}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div style={{ flexShrink: 0 }}>
            {/* Alça (grabber) para fechar */}
            <div className="modal-grabber" onClick={onClose}></div>
          </div>

          <div
            className="client-details-body"
            style={{
              flexGrow: 1,
              overflowY: "auto",
              minHeight: 0,
              padding: "20px",
              textAlign: "center",
            }}
          >
            {loading && (
              <p style={{ textAlign: "center", padding: "40px" }}>
                Carregando...
              </p>
            )}

            {error && (
              <div style={{ textAlign: "center", padding: "20px" }}>
                <p style={{ color: "red" }}>{error}</p>
                <button onClick={onClose} className="form-button">
                  Fechar
                </button>
              </div>
            )}

            {!loading && !error && info && (
              <div className="detail-container">
                {/* --- NOVA FUNCIONALIDADE: Evento de clique na foto para ampliar --- */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "20px",
                  }}
                >
                  <img
                    src={info.foto_data_url || DEFAULT_PHOTO_URL}
                    alt={info.nome}
                    onClick={() => setIsImageZoomed(true)} // Abre a imagem ampliada
                    style={{
                      width: "120px", // Largura fixa
                      height: "120px", // Altura fixa IGUAL à largura
                      borderRadius: "50%", // Faz o círculo perfeito
                      border: "5px solid #f97316", // Borda laranja grossa
                      objectFit: "cover", // Recorta a imagem para caber no círculo sem esticar
                      backgroundColor: "#fff",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                      cursor: "pointer", // Indica que é clicável
                      transition: "transform 0.2s", // Efeito de feedback suave
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.transform = "scale(1.05)")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  />
                </div>
                {/* ---------------------------------------------------------------- */}

                <h2
                  style={{
                    margin: "0 0 20px 0",
                    color: "#111",
                    fontSize: "1.8rem",
                  }}
                >
                  {info.nome}
                </h2>

                {/* CAIXA DE INFORMAÇÕES */}
                <div
                  style={{
                    textAlign: "left",
                    background: "#f8fafc",
                    padding: "20px",
                    borderRadius: "16px",
                    border: "1px solid #e2e8f0",
                    marginBottom: "25px",
                  }}
                >
                  <p style={{ margin: "10px 0", fontSize: "1rem" }}>
                    <strong style={{ color: "#475569" }}>CPF:</strong>{" "}
                    {info.documento || "Não informado"}
                  </p>
                  <p style={{ margin: "10px 0", fontSize: "1rem" }}>
                    <strong style={{ color: "#475569" }}>Telefone:</strong>{" "}
                    {info.telefone}
                  </p>
                  <p style={{ margin: "10px 0", fontSize: "1rem" }}>
                    <strong style={{ color: "#475569" }}>E-mail:</strong>{" "}
                    {info.email || "Não informado"}
                  </p>

                  <hr
                    style={{
                      border: "0",
                      borderTop: "1px solid #e2e8f0",
                      margin: "20px 0",
                    }}
                  />

                  <h3
                    style={{
                      fontSize: "1.1rem",
                      color: "#f97316",
                      marginBottom: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    Pontos obtidos
                  </h3>
                  <div
                    style={{
                      fontSize: "2rem",
                      fontWeight: "800",
                      color: "#0f172a",
                    }}
                  >
                    {info.pontos !== undefined
                      ? `${info.pontos} pontos`
                      : "0 pontos"}
                  </div>
                </div>

                <button
                  onClick={onClose}
                  style={{
                    width: "100%",
                    padding: "16px",
                    backgroundColor: "#f97316",
                    color: "#fff",
                    border: "none",
                    borderRadius: "12px",
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                    cursor: "pointer",
                  }}
                >
                  Fechar Detalhes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- NOVA FUNCIONALIDADE: Modal de Imagem Ampliada (Zoom) --- */}
      {isImageZoomed && info && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.9)", // Fundo preto escuro
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2000, // Z-index maior para sobrepor tudo
            padding: "20px",
          }}
          onClick={() => setIsImageZoomed(false)} // Fecha ao clicar no fundo
        >
          {/* Botão de Fechar */}
          <button
            onClick={() => setIsImageZoomed(false)}
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              background: "rgba(255, 255, 255, 0.3)",
              color: "white",
              border: "none",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              fontSize: "20px",
              fontWeight: "bold",
              cursor: "pointer",
              zIndex: 2001,
            }}
          >
            ×
          </button>

          {/* Imagem Ampliada */}
          <img
            src={info.foto_data_url || DEFAULT_PHOTO_URL}
            alt={info.nome}
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              borderRadius: "16px", // Levemente arredondado igual o modal
              objectFit: "contain", // Mostra a imagem inteira
              boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
            }}
            onClick={(e) => e.stopPropagation()} // Impede que o clique na imagem feche o modal
          />
        </div>
      )}
      {/* --------------------------------------------------------- */}
    </>,
    document.getElementById("modal-root")!,
  );
};

export default DetalhesCliente;
