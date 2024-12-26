import { loginSuccess } from '../redux/reducers/authSlice';
import { useEffect, useState } from "react";
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from "axios";

const PrivateRoute = function({ element }) {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const checkAuthStatus = async function() {
            try {
                const response = await axios.get('http://localhost:3000/profile', {
                    withCredentials: true
                });

                if (response.status === 200) {
                    setIsAuthenticated(true);
                    const user = {
                        id: response.data.id,
                        role: response.data.role
                    }
                    dispatch(loginSuccess(user));
                } 
            } catch (error) {
                console.log(`Authentication check failed: `, error);
                setIsAuthenticated(false);
            }

            setIsLoading(false);
        };

        checkAuthStatus();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? element : <Navigate to="/login" />
}

export default PrivateRoute;

