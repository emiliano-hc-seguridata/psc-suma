import React, { useState } from "react";
import { useAuth } from "./auth_provider";

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { onSignup } = useAuth();
    const handleSignup = () => {
        onSignup(email, password);
    };
    return (
        <div>

            Signup

            <input className="centered-input" value={email} onChange={evt => { setEmail(evt.target.value) }} placeholder='ejemplo@correo.com' id="email-input"></input>
            <input className="centered-input" value={password} onChange={evt => { setPassword(evt.target.value) }} type={"password"} id="password-input"></input>
            <button onClick={handleSignup}>Loggear</button>
        </div>
    );
}
export default Signup;