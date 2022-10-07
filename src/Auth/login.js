import React, { useState } from "react";
import { useAuth } from 'Auth/auth_provider';

const Login = () => {
    const { onLogin } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const loginUser = () => {
        onLogin(email, password);
    };
    return (
        <div className="login" >
            <div className="login-div">
                <input className="centered-input" value={email} onChange={evt => { setEmail(evt.target.value) }} placeholder='ejemplo@correo.com' id="email-input"></input>
                <input className="centered-input" value={password} onChange={evt => { setPassword(evt.target.value) }} type={"password"} id="password-input"></input>
                <span className="login-span">¿Olvidó su contraseña?</span>
                <button className="centered-input login-button" onClick={loginUser}>Iniciar sesión</button>
            </div>
        </div>
    );
};

export default Login;