// src/components/PrivateRoute.jsx
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { checkIfUserIsAdmin } from './utils/checkIfUserIsAdmin.js';

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const isAdmin = checkIfUserIsAdmin();

  useEffect(() => {
    const checkAuth = async () => {
        try {
            await axios.get('http://localhost:5000/api/protected', { withCredentials: true });
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Not authenticated:', error);
            navigate('/');
        }
    };

    checkAuth();
}, [navigate]);

  if (!isAdmin) {
    navigate('/');
    return null;
  }

  return isAuthenticated ? children : null;
};

export default PrivateRoute;
