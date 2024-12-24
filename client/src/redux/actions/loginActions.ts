import { loginRequest, loginSuccess, loginFailure } from '../reducers/authSlice';
import { AppDispatch } from '../store/store';
import axios from 'axios';

export const loginUser = function (email: string, password: string) {
    return async function(dispatch: AppDispatch) {
        dispatch(loginRequest());
        
        try {
            const response = await axios.post('http://localhost:3000/auth/login',{
                email,
                password
            }, { withCredentials: true });

            const user = {
                id: response.data.user.id,
                role: response.data.user.role
            }

            dispatch(loginSuccess(user));
        } catch (error: any) {
            dispatch(loginFailure(error.response.data.message || `Something went wrong!`));
        }
    }
}
