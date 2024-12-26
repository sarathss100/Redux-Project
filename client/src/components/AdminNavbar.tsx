import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/reducers/authSlice';
import { persistor } from '../redux/store/store';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const AdminNavbar = function () {
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
        <nav className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
            <ul className="flex items-center space-x-8">
                <li className="flex items-center space-x-8">
                    <Link to='/admin/dashboard' className="text-gray-700 hover:text-blue-600 font-medium">Admin Dashboard</Link>
                    <Link to='/admin/usermanagement' className="text-gray-700 hover:text-blue-600 font-medium">User Management</Link>
                    <button onClick={handleLogout} className="text-red-600 hover:text-red-700 font-medium">Logout</button>
                </li>
            </ul>
            </div>
        </nav>
    )
};

export default AdminNavbar;