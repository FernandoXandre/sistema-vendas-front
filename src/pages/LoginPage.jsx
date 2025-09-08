import React from "react";
import LoginForm from "../components/forms/loginForm/LoginForm";
import { useNavigate } from "react-router-dom";

function LoginPage ({onLogin}){
    const navigate = useNavigate();

    const handleLoginSucess = () => {
        onLogin(true);
        navigate('/home');
    };

    return (
        <div className="login-page-container"> 
            <LoginForm onLoginSucess={handleLoginSucess}/>
        </div>
    );
}

export default LoginPage;