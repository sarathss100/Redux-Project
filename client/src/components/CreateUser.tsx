import { useState } from "react";

const CreateUserModal = ({ isOpen, onClose, onSubmit }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(username, email, password);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Create User</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Username</label>
                <input
                  type="text"
                  value={username}
                  placeholder="Username"
                  onChange={updateUsername}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  placeholder="Email"
                  onChange={updateEmail}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  placeholder="Password"
                  onChange={updatePassword}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  required
                />
              </div>
              <div className="flex justify-end gap-2 mt-6">
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Create User</button>
              <button className="px-4 py-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200" onClick={onClose}>Close</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateUserModal;
