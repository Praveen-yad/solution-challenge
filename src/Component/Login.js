import React, { useState } from 'react';
import { auth } from './Firebase.js';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import './Style/Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password).then((auth) => {
            console.log(auth);
             if (auth) {
                alert('Logged in')
                console.log(auth);
            }
            }).catch(error => alert(error.message));
        
    };

    return (
        <div className="container-fluid">
            <div className="box">
                <h3><span className="span"></span>Login</h3>
                <form onSubmit={handleLogin}>
                    <div className="input_box">
                        <label className='label'>Email</label>
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="input_box">
                        <label className='label'>Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <p className="forgot_password"><a href="/lawyer-signup">Don't have an Account?</a></p>
                    <button className='submitButton' type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
