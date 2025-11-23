import React, { useState, useRef, useEffect } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';
import ReactDOM from 'react-dom';
import { IMaskInput } from 'react-imask';

const hasLowercase = (password: string) => /[a-z]/.test(password);
const hasUppercase = (password: string) => /[A-Z]/.test(password);
const hasNumber = (password: string) => /[0-9]/.test(password);
const hasSpecialChar = (password: string) => /[!@#$%^&*()_+=\[\]{};':"\\|,.<>\/?~-]/.test(password);

interface EsqueciSenhaProps {
  estaAberto: boolean;
  onClose: () => void;
  resetTrigger: number;
}

type Etapa = 'telefone' | 'validar' | 'novaSenha';

const EsqueciSenha: React.FC<EsqueciSenhaProps> = ({ estaAberto, onClose, resetTrigger }) => {
  
  const [etapa, setEtapa] = useState<Etapa>('telefone');

  const [telefone, setTelefone] = useState('');
  const [codigo, setCodigo] = useState<string[]>(Array(6).fill(''));
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmarSenha] = useState('');
  
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const isMounted = useRef(false);

  const [erroSenha, setErroSenha] = useState('');
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);
  const [reqCase, setReqCase] = useState(false); 
  const [reqNumber, setReqNumber] = useState(false);
  const [reqSpecialChar, setReqSpecialChar] = useState(false);
  const [reqMinLength, setReqMinLength] = useState(false);

  const internalReset = () => {
    console.log("Resetando estado do modal 'Esqueci Senha'...");
    setEtapa('telefone');
    setTelefone('');
    setCodigo(Array(6).fill(''));
    setSenha('');
    setConfirmarSenha('');
    
    setErroSenha('');
    setShowPasswordRequirements(false);
    setReqCase(false);
    setReqNumber(false);
    setReqSpecialChar(false);
    setReqMinLength(false);
  };

  useEffect(() => {
    if (isMounted.current) {
      internalReset();
    } else {
      isMounted.current = true;
    }
  }, [resetTrigger]);

  
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
  
  const handleEnviarCodigo = (e: React.FormEvent) => {
    e.preventDefault(); 
    
    if (telefone.length < 15) {
      alert('Por favor, digite um número de telefone completo.');
      return;
    }

    console.log('Enviando código para:', telefone);
    setEtapa('validar');
  };

  const handleValidarCodigo = (e: React.FormEvent) => {
    e.preventDefault();
    const codigoCompleto = codigo.join('');
    console.log('Código a validar:', codigoCompleto);
    setEtapa('novaSenha');
  };

  const handleSalvarSenha = (e: React.FormEvent) => {
    e.preventDefault();
    setErroSenha('');

    if (senha !== confirmaSenha) {
      setErroSenha('As senhas não coincidem.');
      return;
    }

    const allReqsMet = reqCase && reqNumber && reqSpecialChar && reqMinLength;
    if (!allReqsMet) {
      setErroSenha('A senha não atende a todos os requisitos.');
      return;
    }

    console.log('Salvando nova senha para o telefone:', telefone);
    onClose(); 
  };

  const handleCodigoChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    if (/^[0-9]$/.test(value) || value === '') {
      const novoCodigo = [...codigo];
      novoCodigo[index] = value;
      setCodigo(novoCodigo);
      if (value !== '' && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleCodigoKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && codigo[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const renderEtapaTelefone = () => (
    <form onSubmit={handleEnviarCodigo}>
      <h2 className="card__title" style={{ marginTop: 0 }}>Recuperar Senha</h2>
      <div className="form-group">
        <IMaskInput
          mask="(00) 00000-0000" 
          value={telefone}
          onAccept={(value: string) => setTelefone(value)}
          className="form-input"
          placeholder="Digite seu Telefone"
          required
        />
      </div>
      <div className="form-group">
        <button type="submit" className="btn btn-primary">
          Enviar código
        </button>
      </div>
    </form>
  );

  const renderEtapaValidar = () => (
    <form onSubmit={handleValidarCodigo}>
      <h2 className="card__title" style={{ marginTop: 0 }}>Validar Código</h2>
      <p style={{ textAlign: 'center', marginBottom: '20px' }}>
        Insira o código de 6 dígitos enviado para {telefone}.
      </p>
      <div className="form-group codigo-inputs">
        {codigo.map((digito, index) => (
          <input
            key={index} type="tel" maxLength={1}
            className="form-input codigo-input"
            value={digito}
            onChange={(e) => handleCodigoChange(e, index)}
            onKeyDown={(e) => handleCodigoKeyDown(e, index)}
            ref={(el) => { inputRefs.current[index] = el; }}
            required
          />
        ))}
      </div>
      <div className="form-group">
        <button type="submit" className="btn btn-primary">
          Validar Código
        </button>
      </div>
    </form>
  );

  const renderEtapaNovaSenha = () => (
    <form onSubmit={handleSalvarSenha}>
      <h2 className="card__title" style={{ marginTop: 0 }}>Cadastre sua senha nova</h2>
      
      <div className="form-group">
        <input 
          type="password" 
          placeholder="Crie sua senha" 
          className="form-input" 
          value={senha}
          onChange={handlePasswordChange}
          onFocus={() => setShowPasswordRequirements(true)}
          required 
        />
      </div>
      <div className="form-group">
        <input 
          type="password" 
          placeholder="Confirme sua senha" 
          className="form-input" 
          value={confirmaSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
          onFocus={() => setShowPasswordRequirements(true)}
          required 
        />
      </div>

      {showPasswordRequirements && (
        <div className="password-requirements-box">
          <ul>
            <li className={reqCase ? 'checked' : ''}>
              {reqCase ? '✅' : '❌'} Letras minúsculas e maiúsculas
            </li>
            <li className={reqNumber ? 'checked' : ''}>
              {reqNumber ? '✅' : '❌'} Um número (0-9)
            </li>
            <li className={reqSpecialChar ? 'checked' : ''}>
              {reqSpecialChar ? '✅' : '❌'} Um caractere especial (!@#$)
            </li>
            <li className={reqMinLength ? 'checked' : ''}>
              {reqMinLength ? '✅' : '❌'} Pelo menos 8 caracteres
            </li>
          </ul>
        </div>
      )}
      {erroSenha && <p style={{ color: 'red', textAlign: 'center', marginBottom: '10px' }}>{erroSenha}</p>}

      <div className="form-group">
        <button type="submit" className="btn btn-primary">Salvar Senha</button>
      </div>
    </form>
  );


  return ReactDOM.createPortal(
    <>
      <div 
        className="modal-overlay" 
        style={{ display: estaAberto ? 'flex' : 'none' }} 
        onClick={onClose}
      >
        <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
          <div className="modal-grabber"></div>
          
          {etapa === 'telefone' && renderEtapaTelefone()}
          {etapa === 'validar' && renderEtapaValidar()}
          {etapa === 'novaSenha' && renderEtapaNovaSenha()}
          
        </div>
      </div>
    </>,
    document.getElementById('modal-root')!
  );
};

export default EsqueciSenha;