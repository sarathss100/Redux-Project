import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { loginUser } from '../redux/actions/loginActions';
import { clearError } from '../redux/reducers/authSlice';

const LoginPage = function() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
 
    const updateEmail = function(event) {
        const newEmail = event.target.value;
        return setEmail(newEmail);
    };

    const updatePassword = function(event) {
        const newPassword = event.target.value;
        return setPassword(newPassword);
    };

    const { loading, error, user } = useSelector((state) => state.auth);
    
    const handleRegister = function(event) {
        event.preventDefault();
        dispatch(clearError());
        dispatch(loginUser(email, password));
    }
    
    useEffect(() => {
        if (user && user.role === 'user') {
            navigate('/');
        } else if (user && user.role === 'admin') {
            navigate('/admin/usermanagement')
        }
    }, [user, navigate]);

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleRegister}>
                <input type='email' value={email}  placeholder='Email' onChange={updateEmail} required />
                <input type='password' value={password} placeholder='Password' onChange={updatePassword} required />
                <button type='submit'>Login</button>
            </form>

            {loading && <p>SignIn...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    )
};

export default LoginPage;