import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { logout } from '../redux/reducers/authSlice';
import { persistor } from '../redux/store/store';

const Navbar = function() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async function() {
        try {
            await axios.post('http://localhost:3000/logout', {}, { withCredentials: true } );
            dispatch(logout());
            persistor.purge();
            navigate('/login');
        } catch (error) {
            console.error(`Error logging out:`, error);
        }
    }

    return (
        <nav>
            <ul>
                <li>
                    <Link to='/'>Home</Link>
                    <Link to='/profile'>Profile</Link>
                    <button onClick={handleLogout}>Logout</button>
                </li>
            </ul>
        </nav>
    )
};

export default Navbar;