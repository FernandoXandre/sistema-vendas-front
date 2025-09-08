import React, {useState} from "react";
import Button from "../../button/Button"
import Input from "../../inputs/Input";
import './LoginForm.css'

function LoginForm({onLoginSucess}){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if(username === 'teste' && password === "teste"){
            alert("Login bem sucedido")
            onLoginSucess();
        } else {
            alert('Falha')
        }
    };

    return (
        <form className = "login-form" onSubmit={handleSubmit}>
            <h2>Acessar o Sistema</h2>
            
            <Input 
                label={"Usuario"}
                placeholder={"Digite algo"}
                onChange={(e) => setUsername(e.target.value)}
                value={username}
            />
            <Input 
                label={"Senha"}
                placeholder={"Digite algo"}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <Button type="submit">Entrar</Button>
            
        </form>
    );
}

export default LoginForm;