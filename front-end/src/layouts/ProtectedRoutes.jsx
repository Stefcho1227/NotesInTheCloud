// ProtectedRoute.jsx
import { useNavigate, Outlet } from 'react-router';
import { useEffect, useState } from 'react';
import api from '../api/axiosConfig';

const ProtectedRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const verifyAuth = async () => {
            try {
                await api.get('/auth/verify');
                setIsAuthenticated(true);
            } catch (err) {
                setIsAuthenticated(false);
            }
        };
        verifyAuth();
    }, []);

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    if(!isAuthenticated) navigate('/');

    return <Outlet />;
};

export default ProtectedRoute;