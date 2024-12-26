import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/actions/registrationActions';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = function () {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const updateUsername = function(event) {
    const newUserName = event.target.value;
    return setUsername(newUserName);
  };
  const updateEmail = function(event) {
    const newEmail = event.target.value;
    return setEmail(newEmail);
  };
  const updatePassword = function(event) {
    const newPassword = event.target.value;
    return setPassword(newPassword);
  };

  const { loading, error, regUser } = useSelector((state) => state.registration);
  const { user } = useSelector((state) => state.auth);

  const handleRegister = function(event) {
    event.preventDefault();
    dispatch(registerUser(username, email, password));
  }

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Register</h2>
     
        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <input 
              type="text"
              value={username}
              placeholder="Username"
              onChange={updateUsername}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

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
            Register
          </button>
        </form>

        <div className='w-full flex justify-center mt-2'>
          <Link to='/login' className="text-blue-700 hover:text-blue-900 font-medium">Login</Link>
        </div>
     
        {error && (<p className="mt-4 text-center text-red-500">{error}</p>)}
      </div>
    </div>
  );
};

export default RegisterPage;
