import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/actions/logoutAction';

const Navbar = function() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = function() {
        dispatch(logoutUser());
        navigate('/login');
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