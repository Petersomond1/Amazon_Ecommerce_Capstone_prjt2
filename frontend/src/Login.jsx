import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            console.log('Sending login data:', { email, password }); // Log data being sent
            const response = await axios.post('http://localhost:5000/api/users/login', { email, password }, { withCredentials: true });
            console.log('Login response:', response.data); // Log response from the server
            navigate('/'); // Redirect after login
        } catch (error) {
            console.error('Error logging in user:', error.response ? error.response.data : error.message); // Log detailed error
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
