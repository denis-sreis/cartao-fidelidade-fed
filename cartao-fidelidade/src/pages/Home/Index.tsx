import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

const Logo = () => (
  <img
    src="src/assets/Logo - Gorducinhos.jpg"
    alt="Logo"
    style={{ width: '120px', marginBottom: '32px' }}
  />
);

function Home() {
  const navigate = useNavigate();

  const handleSucesso = (credentialResponse: any) => {
    try {
      const decoded: any = jwtDecode(credentialResponse.credential);
      console.log("Usuário Google:", decoded);

      // Lógica de navegação: 
      // Se for um novo usuário, levamos para concluir o cadastro passando os dados
      // Se já for cadastrado, o seu backend deve validar isso no futuro.
      navigate("/concluir-cadastro", { 
        state: { nome: decoded.name, email: decoded.email } 
      });
    } catch (error) {
      console.error("Erro ao decodificar token:", error);
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