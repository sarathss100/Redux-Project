import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


const RedirectRoute = function({ element }) {
    const { user } = useSelector((state) => state.auth);

    console.log(user)

    if ( user && user.role === 'user') {
        return <Navigate to='/' />
    }

    if ( user && user.role === 'admin') {
        return <Navigate to='/admin/usermanagement' />
    }

    return element;
}

export default RedirectRoute;

