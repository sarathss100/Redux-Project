import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { registerUser } from '../redux/actions/registrationActions';
import { useNavigate } from 'react-router-dom';


const RegisterPage = function () {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const updateUsername = function(event) {
        const newUserName = event.target.value;
        return setUsername(newUserName);
    };

    const updateEmail = function(event) {
        const newEmail = event.target.value;
        return setEmail(newEmail);
    };

    const updatePassword = function(event) {
        const newPassword = event.target.value;
        return setPassword(newPassword);
    };

    const { loading, error, regUser } = useSelector((state) => state.registration);
    const { user } = useSelector((state) => state.auth);

    const handleRegister = function(event) {
        event.preventDefault();
        registerUser(username, email, password);
    }

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input type='text' value={username} placeholder='Username' onChange={updateUsername} required />
                <input type='email' value={email}  placeholder='Email' onChange={updateEmail} required />
                <input type='password' value={password} placeholder='Password' onChange={updatePassword} required />
                <button type='submit'>Register</button>
            </form>

            {loading && <p>Registering...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    )
};

export default RegisterPage;
