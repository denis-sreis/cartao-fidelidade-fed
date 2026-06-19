import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import api from '../../api/index';
const Logo = () => (
  <img
    src="src/assets/Logo - Gorducinhos.jpg"
    alt="Logo"
    style={{ width: '120px', marginBottom: '32px' }}
  />
);

function Home() {
  const navigate = useNavigate();



  const handleSucesso = async (credentialResponse: any) => {
    try {
      const decoded: any = jwtDecode(credentialResponse.credential);
      console.log("Usuário Google:", decoded);

      // 1. Envia os dados para o seu backend Node.js
      const resposta = await api.post('/auth/google', {
          googleId: decoded.sub,
          email: decoded.email,
          nome: decoded.name,
          fotoUrl: decoded.picture
      });

      // 2. Salva o token REAL gerado pelo seu sistema
      localStorage.setItem('token', resposta.data.token);
      
      // 3. Verifica se precisa de mais dados ou se vai direto para a Home

      // --- NOVA LÓGICA DE REDIRECIONAMENTO ---
      if (resposta.data.precisaCompletarCadastro) {
        navigate("/concluir-cadastro", { 
          state: { nome: decoded.name, email: decoded.email } 
        });
      } else {
        // Lemos o token gerado pelo SEU backend para ver o cargo
        const tokenDoBackend: any = jwtDecode(resposta.data.token);
        
        if (tokenDoBackend.tipo === 'admin' || tokenDoBackend.tipo === 'funcionario') {
           // MUDE ISTO AQUI para o nome da rota da sua tela de admin!
           // (ex: "/admin", "/painel", "/principal-adm", etc)
           navigate("/principalADM"); 
        } else {
           navigate("/principalCliente"); 
        }
      }

    } catch (error) {
      console.error("Erro ao fazer login com o Google:", error);
      alert("Falha na comunicação com o servidor.");
    }
  };

  return (
    <div className="container">
      <Logo />
      <div className="card">
        <h2 className="card__title">Entrar</h2>
        
        <p style={{ 
          color: 'var(--color-text-secondary)', 
          marginBottom: 'var(--spacing-xl)',
          fontSize: '1rem' 
        }}>
          Utilize sua conta Google para acessar o sistema de fidelidade.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <GoogleLogin 
            onSuccess={handleSucesso}
            onError={() => console.log("Falha no Login")}
            useOneTap
            shape="pill"
            theme="outline"
            text="continue_with"
            width="300"
          />
        </div>

        <div className="form-footer-text">
          <span>O cadastro é rápido e automático.</span>
        </div>
      </div>
    </div>
  );
}

export default Home;