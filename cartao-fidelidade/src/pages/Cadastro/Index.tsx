import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { IMaskInput } from 'react-imask'; 
import { useNavigate } from 'react-router-dom';
import { loginSchema } from '../Cadastro/validador'; 
import { register } from '../../api/cadastro';
import { login } from '../../api/auth';

const urlOlhoFechado = 'https://cdn-icons-png.flaticon.com/128/3178/3178377.png';
const urlOlhoAberto = 'https://cdn-icons-png.flaticon.com/128/158/158746.png';

const hasLowercase = (password: string) => /[a-z]/.test(password);
const hasUppercase = (password: string) => /[A-Z]/.test(password);
const hasNumber = (password: string) => /[0-9]/.test(password);
const hasSpecialChar = (password: string) => /[!@#$%^&*()_+=\[\]{};':"\\|,.<>\/?~-]/.test(password);

interface CadastroProps {
  onClose: () => void;
}

const Cadastro: React.FC<CadastroProps> = ({ onClose }) => {
  const [step, setStep] = useState(1); 
  const navigate = useNavigate();
  const [userType, setUserType] = useState<'cliente' | 'funcionario'>('cliente');

  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [documento, setDocumento] = useState('');

  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erroSenha, setErroSenha] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);
  const [reqCase, setReqCase] = useState(false); 
  const [reqNumber, setReqNumber] = useState(false);
  const [reqSpecialChar, setReqSpecialChar] = useState(false);
  const [reqMinLength, setReqMinLength] = useState(false);
  const [erroStep1, setErroStep1] = useState('');

  const mascaraTelefone = { mask: '(00) 0 0000-0000' };
  const mascaraCPF={ mask: '000.000.000-00' }; 
  const mascaraCNPJ=  { mask: '00.000.000/0000-00' } ;
  const mascaraDocumento = userType === 'cliente' ? mascaraCPF : mascaraCNPJ;
  const mascaraNome = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s]*$/;

  const updatePasswordRequirements = (currentPassword: string) => {
    setReqCase(hasLowercase(currentPassword) && hasUppercase(currentPassword));
    setReqNumber(hasNumber(currentPassword));
    setReqSpecialChar(hasSpecialChar(currentPassword));
    setReqMinLength(currentPassword.length >= 8);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setSenha(newPassword);
    updatePasswordRequirements(newPassword);
    if (erroSenha) {
      setErroSenha('');
    }
  };

  const handleStep1Submit = (event: React.FormEvent) => {
    event.preventDefault();
    setErroStep1('');

    const telefoneSemMascara = telefone.replace(/\D/g, '');
    const documentoSemMascara = documento.replace(/\D/g, '');
    const nomeCortado = nome.trim();
    const { error } = loginSchema.validate({ documento:documentoSemMascara, telefone:telefoneSemMascara, nome: nomeCortado }, {context: { userType: userType }});
    if(error){
      setErroStep1(error.details[0].message);
      return;
    }
    setStep(2); 
  };

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    setErroSenha(''); 

    if (senha !== confirmarSenha) {
      setErroSenha('As senhas não coincidem.');
      return;
    }
    const allReqsMet = reqCase && reqNumber && reqSpecialChar && reqMinLength;
    if (!allReqsMet) {
      setErroSenha('A senha não atende a todos os requisitos.');
      return;
    }
    const documentoLimpo = documento.replace(/\D/g, '');
    
    try {
      const response = await register({
        nome: nome,
        telefone: telefone,
        documento: documento,
        senha: senha,
        tipo: userType 
      });

      localStorage.clear(); 
      await login({ documento: documentoLimpo, senha: senha });

      if (userType === 'funcionario') {
        navigate('/principalADM'); 
      } else {
        navigate('/principalCliente'); 
      }
      
    } catch (err) {
      setErroSenha(err instanceof Error ? err.message : 'Ocorreu um erro desconhecido.');
    }
  };

  const handleUserTypeChange = (novoTipo: 'cliente' | 'funcionario') => {
    if (userType !== novoTipo) {
      setUserType(novoTipo);
      setDocumento(''); 
      setErroStep1(''); 
    }
  }; 
  
  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="modal-grabber"></div>

        {step === 1 && (
          <>
            <h2 className="card__title" style={{ marginTop: 0 }}>Cadastre-se</h2>
            <div className="toggle-group">
              <button 
                className={`toggle-btn ${userType === 'cliente' ? 'active' : ''}`}
                onClick={() => handleUserTypeChange('cliente')}
                type="button"
              >
                Sou cliente
              </button>
              <button 
                className={`toggle-btn ${userType === 'funcionario' ? 'active' : ''}`}
                onClick={() => handleUserTypeChange('funcionario')}
                type="button"
              >
                Sou empresa
              </button>
            </div>

            <form onSubmit={handleStep1Submit}>
              <div className="form-group">
                <IMaskInput 
                  mask={mascaraNome}      
                  type="text" 
                  placeholder="Digite seu nome" 
                  className="form-input" 
                  value={nome}
                  onAccept={(value: string) => setNome(value)} 
                  required 
                />
              </div>
              <div className="form-group">
                <IMaskInput
                  mask={mascaraTelefone.mask}
                  placeholder="Digite seu telefone" 
                  className="form-input" 
                  value={telefone}
                  onAccept={(value: string) => setTelefone(value)}
                  required 
                />
              </div>
              <div className="form-group">
                <IMaskInput 
                  mask={mascaraDocumento.mask}
                  placeholder={userType === 'cliente' ? "Digite seu CPF" : "Digite seu CNPJ"}
                  className="form-input" 
                  value={documento}
                  onAccept={(value: string) => setDocumento(value)}
                  required 
                />
              </div>
              {erroStep1 && <p style={{ color: 'red', textAlign: 'center', marginBottom: '10px' }}>{erroStep1}</p>}
              <div className="form-group">
                <button type="submit" className="btn btn-primary">Avançar</button>
              </div>
            </form>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="card__title" style={{ marginTop: 0 }}>Crie sua senha</h2>
            <form onSubmit={handleRegister}>
              <div className="form-group password-group">
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Crie sua senha" 
                  className="form-input" 
                  value={senha}
                  onChange={handlePasswordChange}
                  onFocus={() => setShowPasswordRequirements(true)}
                  required 
                />
                <span
                  className="password-toggle-icon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <img
                    src={showPassword ? urlOlhoAberto : urlOlhoFechado}
                    alt="Mostrar/Ocultar Senha"
                    className="eye-icon"
                  />
                </span>
              </div>

              <div className="form-group password-group">
                <input 
                  type={showConfirmPassword ? "text" : "password"} 
                  placeholder="Confirme sua senha" 
                  className="form-input" 
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  required 
                />
                <span
                  className="password-toggle-icon"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <img
                    src={showConfirmPassword ? urlOlhoAberto : urlOlhoFechado}
                    alt="Mostrar/Ocultar Senha"
                    className="eye-icon"
                  />
                </span>
              </div>

              {showPasswordRequirements && (
                <div className="password-requirements-box">
                  <ul>
                    <li className={reqCase ? 'checked' : ''}>{reqCase ? '✅' : '❌'} Maiúsculas e minúsculas</li>
                    <li className={reqNumber ? 'checked' : ''}>{reqNumber ? '✅' : '❌'} Um número (0-9)</li>
                    <li className={reqSpecialChar ? 'checked' : ''}>{reqSpecialChar ? '✅' : '❌'} Caractere especial</li>
                    <li className={reqMinLength ? 'checked' : ''}>{reqMinLength ? '✅' : '❌'} Mínimo 8 caracteres</li>
                  </ul>
                </div>
              )}

              {erroSenha && <p style={{ color: 'red', textAlign: 'center', marginBottom: '10px' }}>{erroSenha}</p>}

              <div className="form-group">
                <button type="submit" className="btn btn-primary">Criar conta</button>
              </div>
              <div className="form-footer-text">
                <a href="#" className="link" onClick={(e) => { e.preventDefault(); setStep(1); }}>Voltar</a>
              </div>
            </form>
          </>
        )}
      </div>
    </div>,
    document.getElementById('modal-root')!
  );
}

export default Cadastro;