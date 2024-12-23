import { logout } from "../reducers/authSlice";
import { AppDispatch } from "../store/store";
import axios from "axios";

export const logoutUser = async function() {
    return async function(dispatch: AppDispatch) {
        try {
            await axios.post('http://localhost:3000/logout', {}, { withCredentials: true } );
            dispatch(logout());
        } catch (error) {
            console.error(`Error logging out:`, error);
        }
    }
}