import { loginSuccess } from '../reducers/authSlice';
import { registrationRequest, registrationSuccess, registrationFailure } from '../reducers/registrationSlice';
import { AppDispatch } from '../store/store';
import axios from 'axios';

export const registerUser = function (username: string, email: string, password: string) {
    return async function(dispatch: AppDispatch) {
        dispatch(registrationRequest());
        try {
            const response = await axios.post('http://localhost:3000/auth/register',{
                username,
                email,
                password
            }, { withCredentials: true });

            dispatch(registrationSuccess(response.data.user));
            dispatch(loginSuccess(response.data.user));
        } catch (error: any) {
            dispatch(registrationFailure(error.response.data.message || `Something went wrong!`));
        }
    }
}
