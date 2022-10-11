import React, { useEffect, useState } from "react";
import { useAuth } from 'Auth/auth_provider';
import TOTP from '../providers/totp';

const Login = () => {
    const { onLogin } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const totpProvider = new TOTP();
    const loginUser = () => {
        onLogin(email, password);
    };
    useEffect(() => {
        // declare the data fetching function
        const fetchData = async () => {
            const data = await totpProvider.systemLogin();
        }

        // call the function
        fetchData()
            // make sure to catch any error
            .catch(console.error);
    });
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