import { useEffect, useState } from "react";
import { Navigate } from 'react-router-dom';
import axios from "axios";

const PrivateRoute = function({ element }) {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuthStatus = async function() {
            try {
                const response = await axios.get('http://localhost:3000/profile', {
                    withCredentials: true
                });

                if (response.status === 200) {
                    setIsAuthenticated(true);
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

