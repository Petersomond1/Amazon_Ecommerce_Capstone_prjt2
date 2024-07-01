import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [street, setStreet] = useState('');
    const [apartment, setApartment] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');
    const [country, setCountry] = useState('');
    const [phone, setPhone] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            console.log('Registering user with data:', { name, email, password, street, apartment, city, zip, country, phone });
            const response = await axios.post('http://localhost:5000/api/users/register', {
                name,
                email,
                password,
                street,
                apartment,
                city,
                zip,
                country,
                phone,
                isAdmin: false
            });
            console.log('Response from register:', response.data);
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} placeholder="Street" />
            <input type="text" value={apartment} onChange={(e) => setApartment(e.target.value)} placeholder="Apartment" />
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" />
            <input type="text" value={zip} onChange={(e) => setZip(e.target.value)} placeholder="Zip" />
            <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Country" />
            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" />
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
