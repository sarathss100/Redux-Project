import { useState, useEffect } from "react";
import AdminNavbar from "../components/AdminNavbar";
import { Search } from "lucide-react";
import axios from "axios";
import Swal from 'sweetalert2';
import CreateUserModal from "../components/CreateUser";
import EditUserModal from "../components/EditUser";

const AdminUserManagement = function() {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const openEditModal = (user) => {
        setSelectedUser(user);
        setIsEditModalOpen(true);
    }
    const closeEditModal = () => {
        setIsEditModalOpen(false);
    }

    // Fetch users based on search query
    const fetchUsers = async (query = "") => {
        setLoading(true);
        try {
            let data = [];
            let response = '';
            if (query === '') {
                response = await axios.get(`http://localhost:3000/getUsers`, { withCredentials: true });
                data = response.data;
            } else {
                response = await axios.get(`http://localhost:3000/search-users?searchQuery=${query}`, { withCredentials: true });
                data = response.data;
            }
            
            if (data) {
                setUsers(data.users);
                setError(null);
            } else {
                setError(data.message);
            }
        } catch (err) {
            setUsers([]);
            setError("Nothing found");
        } finally {
            setLoading(false);
        }
    };

    // Handle user deletion
    const handleDelete = async (userId) => {
        // Use SweetAlert2 to show confirmation dialog
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this user?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    });

    
        if (result.isConfirmed) {
      try {
        const response = await axios.put(`http://localhost:3000/delete-user/${userId}`, null, { withCredentials: true });

        if (response.status === 200) {
          Swal.fire('Deleted!', 'The user has been deleted.', 'success'); // Show success message
          fetchUsers(); // Refresh the user list
        } else {
          Swal.fire('Error!', 'Failed to delete user.', 'error'); // Show error message
        }
      } catch (error) {
        Swal.fire('Error!', 'Failed to delete user.', 'error');
      }
    }
    };

    const handleCreateUser = async (username: string, email: string, password: string) => {

    try {
      const response = await axios.post('http://localhost:3000/create-user',{
                username,
                email,
                password
            }, { withCredentials: true });

      if (response.status === 201) {
        // User created successfully, show success message with SweetAlert2
        Swal.fire({
          title: 'Success!',
          text: 'User created successfully.',
          icon: 'success',
          confirmButtonText: 'Okay',
        });

        closeModal();
        fetchUsers();

      } else {
        throw new Error(`User creation failed`)
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.response?.data?.message || 'An error occurred while creating the user.',
        icon: 'error',
        confirmButtonText: 'Try Again',
      });
    }
  };

  const handleEditUser = async (username: string, email: string, password: string, userId: string) => {

    try {
      const response = await axios.post(`http://localhost:3000/edit-user/${userId}`,{
                username,
                email,
                password
            }, { withCredentials: true });

      if (response.status === 201) {
        // User created successfully, show success message with SweetAlert2
        Swal.fire({
          title: 'Success!',
          text: 'Updated successfully.',
          icon: 'success',
          confirmButtonText: 'Okay',
        });

        closeEditModal();
        fetchUsers();

      } else {
        throw new Error(`User creation failed`)
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.response?.data?.message || 'An error occurred while creating the user.',
        icon: 'error',
        confirmButtonText: 'Try Again',
      });
    }
  };

    useEffect(() => {
        fetchUsers(searchQuery);
    }, [searchQuery]);

    return (
        <div className="min-h-screen bg-gray-50">
            <AdminNavbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">
                        User Management
                    </h1>
                    
                    {/* Search Bar */}
                    <div className="flex justify-between">
                        <div className="relative max-w-md">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by username, email or role..."
                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                        </div>
                        <div>
                            <button 
                                onClick={openModal}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                            >
                                Create User
                            </button>
                        </div>
                    </div>
                </div>
                
                {loading ? (
                    <div className="text-center py-4">Loading...</div>
                ) : (
                    <div className="bg-white rounded-lg shadow overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {users.map((user) => (
                                    <tr key={user._id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {user.username}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {user.email}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                {user.role}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <button
                                                onClick={() => openEditModal(user)}
                                                className="text-blue-600 hover:text-blue-800 font-medium mr-2"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(user._id)}
                                                className="text-red-600 hover:text-red-800 font-medium"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {error && (<div className="w-full flex justify-center items-center mt-8 p-4 text-xl font-semibold rounded-md shadow-lg"><p>{error}</p></div>)}
                <CreateUserModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onSubmit={handleCreateUser}
                />

                {isEditModalOpen && selectedUser && (
  <EditUserModal
    isOpen={isEditModalOpen}
    onClose={closeEditModal}
    onSubmit={handleEditUser}
    user={selectedUser}
  />
)}

                
            </div>
        </div>
    );
};

export default AdminUserManagement;