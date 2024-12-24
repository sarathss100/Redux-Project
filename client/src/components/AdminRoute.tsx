import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


const AdminRoute = function({ element }) {
    const { user } = useSelector((state) => state.auth);

    if ( !user || user.role !== 'admin') {
        return <Navigate to='/' />
    }

    return element;
}

export default AdminRoute;

