import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from '../redux/actions/loginActions';
import { clearError } from '../redux/reducers/authSlice';

const LoginPage = function () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const updateEmail = function(event) {
    const newEmail = event.target.value;
    return setEmail(newEmail);
  };

  const updatePassword = function(event) {
    const newPassword = event.target.value;
    return setPassword(newPassword);
  };

  const { loading, error, user } = useSelector((state) => state.auth);
    
  const handleRegister = function(event) {
    event.preventDefault();
    dispatch(clearError());
    dispatch(loginUser(email, password));
  }
    
  useEffect(() => {
    if (user && user.role === 'user') {
        navigate('/');
    } else if (user && user.role === 'admin') {
        navigate('/admin/dashboard')
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Login</h2>
        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <input 
              type="email"
              value={email}
              placeholder="Email"
              onChange={updateEmail}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          <div>
            <input 
              type="password"
              value={password}
              placeholder="Password" 
              onChange={updatePassword}
              required
             className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors font-medium"
          >
            Login
          </button>
        </form>
        <div className='w-full flex justify-center mt-2'>
          <Link to='/register' className="text-blue-700 hover:text-blue-900 font-medium">Don't have an account.Click here</Link>
        </div>
        {error && (
          <p className="mt-4 text-center text-red-500">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginPage;