import React from 'react';
import '../../index.css';

const Logo = () => (
  <img
    src="src/assets/Logo - Gorducinhos.jpg"
    alt="Logo"
    style={{ width: '120px', marginBottom: '32px' }}
  />
);

function Home() {
  const handleGoogleLogin = () => {
    // Aqui o navegador redireciona para a rota do Backend que inicia o Google Auth
    window.location.href = 'http://localhost:3000/auth/google';
  };

  return (
    <div className="container">
      <Logo />
      <div className="card">
        <h2 className="card__title">Bem-vindo</h2>
        
        <p style={{ 
          color: 'var(--color-text-secondary)', 
          marginBottom: 'var(--spacing-lg)',
          fontSize: '1rem' 
        }}>
          Para acessar sua conta com segurança, utilize o botão abaixo.
        </p>

        <div className="form-group">
          <button 
            type="button" 
            className="btn btn-primary" 
            onClick={handleGoogleLogin}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
          >
            {/* Ícone simples do Google (pode trocar pela URL de um ícone real) */}
            <img 
              src="https://cdn-icons-png.flaticon.com/128/300/300221.png" 
              alt="Google" 
              style={{ width: '20px', height: '20px', filter: 'brightness(0) invert(1)' }} 
            />
            Entrar com Google
          </button>
        </div>

        <div className="form-footer-text">
          <span>Ao entrar, você concorda com nossos termos.</span>
        </div>
      </div>
    </div>
  );
}

export default Home;