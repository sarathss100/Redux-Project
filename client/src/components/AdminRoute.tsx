import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";


const AdminRoute = function ({ element }) {
    const { user } = useSelector((state) => state.auth);

    if (user && user.role !== 'admin') {
        return <Navigate to='/' />
    }
    
    if ( !user ) {
        return <Navigate to='/login' />
    }

    return element;
}

export default AdminRoute;

