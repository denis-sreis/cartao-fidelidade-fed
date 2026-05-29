import { StrictMode } from 'react';
import {jwtDecode} from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin} from '@react-oauth/google';
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
                        onSuccess={(sucessoLogin) => {
                            console.log(jwtDecode(sucessoLogin.credential));

                            navigate("/");
                        }}
                        onError={falhaLogin}
                        text='continue_with'/>
                    </GoogleOAuthProvider>
                </StrictMode>
            </div>
        </>
    )
}

export default Criacao;