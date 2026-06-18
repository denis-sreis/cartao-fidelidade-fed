import { StrictMode } from 'react';
import {jwtDecode} from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin} from '@react-oauth/google';
import api from '../../api/index';
import './decoracao.css';


const Criacao = () => {
    
    const navigate = useNavigate();

    const falhaLogin = () => {
        console.log("Falha ao fazer login com o Google");
    };

    return(
        <>
            <div id='center'>
                <h1>Cadastro</h1>


                <StrictMode>
                    <GoogleOAuthProvider clientId='78893072402-9sev40sfss82edtqignknjev4h2krdhf.apps.googleusercontent.com'
                    >

                        <GoogleLogin 
                        onSuccess={async (sucessoLogin) => {
                            try {
                                const decoded: any = jwtDecode(sucessoLogin.credential!);
                                
                                // 1. Envia os dados para o backend
                                const resposta = await api.post('/auth/google', {
                                    googleId: decoded.sub,
                                    email: decoded.email,
                                    nome: decoded.name,
                                    fotoUrl: decoded.picture
                                });

                                // 2. Salva o token que o backend gerou
                                localStorage.setItem('token', resposta.data.token);

                                // 3. Decide para onde ir baseado na resposta do backend
                                if (resposta.data.precisaCompletarCadastro) {
                                    navigate("/concluir-cadastro", { 
                                        state: { nome: decoded.name, email: decoded.email } 
                                    });
                                } else {
                                    navigate("/principalCliente"); // Ou a tela Home apropriada
                                }

                            } catch (error) {
                                console.error("Erro na autenticação com o backend:", error);
                                falhaLogin();
                            }
                        }}
                        onError={falhaLogin}
                        useOneTap
                        />
                    </GoogleOAuthProvider>
                </StrictMode>
            </div>
        </>
    )
}

export default Criacao;