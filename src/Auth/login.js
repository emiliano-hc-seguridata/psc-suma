import React, { useEffect, useState } from "react";
import { useAuth } from 'auth/auth_provider';
import TOTP from '../providers/totp';
import { async } from "@firebase/util";

const Login = () => {
    const { onLogin } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOTP] = useState('');
    const [hasTOTP, setHasTOTP] = useState(false);
    const [displayTOTP, setDisplayTOTP] = useState(false);
    const [otpB64, setOTPB64] = useState('');
    const totpProvider = new TOTP();
    const loginUser = async () => {
        const validTOTP = await totpProvider.validateAccess(otp, email);
        if (validTOTP) {
            onLogin(email, password);
        }
        else {
            alert('TOTP Incorrecto');
        }
    };
    const createTOTPComponent = async () => {
        const b64 = await totpProvider.registerUser(email);
        if (b64) {
            setHasTOTP(false);
            setOTPB64('data:image/jpeg;charset=utf-8;base64,' + b64);
        }
        else {
            setHasTOTP(true);
        }
        setDisplayTOTP(true);
    };

    useEffect(() => {
        const fetchData = async () => {
            await totpProvider.systemLogin();
        }
        fetchData()
            .catch(console.error);
    });
    const otpDiv = () => {
        return (
            <div>
                {
                    !hasTOTP && <img src={otpB64} alt="qrCode" />
                }
                <label>Ingresa tu TOTP<input type="text" pattern="\d*" maxLength={6} value={otp} onChange={evt => { setOTP(evt.target.value) }} ></input></label>
                <button className="centered-input login-button" onClick={loginUser}>Iniciar sesión</button>
            </div>
        );
    };

    const loginForm = () => {
        return (
            <>
                <input className="centered-input" value={email} onChange={evt => { setEmail(evt.target.value) }} placeholder='ejemplo@correo.com' id="email-input"></input>
                <input className="centered-input" value={password} onChange={evt => { setPassword(evt.target.value) }} type={"password"} id="password-input"></input>
                <span className="login-span">¿Olvidó su contraseña?</span>
                <button className="centered-input login-button" onClick={createTOTPComponent}>Iniciar sesión</button>
            </>
        );
    };

    return (
        <div className="login" >

            <div className="login-div">
                {displayTOTP ? otpDiv() : loginForm()}

            </div>
        </div>
    );
};

export default Login;