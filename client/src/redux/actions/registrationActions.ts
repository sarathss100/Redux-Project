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

            dispatch(registrationSuccess({ id: response.data.user.id, role: response.data.user.role }));
            dispatch(loginSuccess({id: response.data.user.id, role: response.data.user.role }));
        } catch (error) {
            dispatch(registrationFailure(`Something went wrong!`));
        }
    }
}
