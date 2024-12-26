import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import ChangePasswordModal from "../components/ChangePassword";

const ProfilePage = function () {
  const [user, setUser] = useState({
    username: 'test',
    email: 'test',
    profileImage: 'https://cdn-icons-png.flaticon.com/128/1144/1144760.png'
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handlePasswordChange = async (currentPassword, newPassword) => {
    try {
      const response = await axios.post("http://localhost:3000/profile/change-password", {
        currentPassword,
        newPassword
      },
      { withCredentials: true }
    );
      closeModal();
    } catch (error) {
      console.error("Error changing password:", error);
    }
  };

  useEffect(() => {
    (async function() {
      try {
        const response = await axios.get('http://localhost:3000/profile', { withCredentials: true });
          if (response && response.data) {
            setUser((prevState) => {
              prevState = {
                username: response.data.username || prevState.username,
                email: response.data.email || prevState.email,
                profileImage: response.data.profileImage || prevState.profileImage
              }
             return prevState;
            })
          }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }})();
  }, []);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser((prevState) => ({
          ...prevState,
          profileImage: reader.result as string,
        }));
      };
      reader.readAsDataURL(file); 
    }
  };

    const handleImageUpload = async () => {
        if (selectedImage) {
            try {
                const formData = new FormData();
                formData.append("profileImage", selectedImage);

                const response = await axios.post("http://localhost:3000/profile/upload-image", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    withCredentials: true,
                });

                if (response.data && response.data.profileImage) {
                    setUser((prevState) => ({
                        ...prevState,
                        profileImage: response.data.profileImage,
                    }));
                }
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        }

        setSelectedImage(null);
    };

    return (
        <div className="min-h-screen bg-gray-50">
    <Navbar />
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow p-8 flex flex-col items-center">
        <div className="relative mb-6">
          <img 
            src={user.profileImage} 
            alt="Profile image" 
            onClick={() => document.getElementById("image-upload")?.click()}
            className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 hover:border-blue-500 transition-colors cursor-pointer"
          />
          <input 
            id="image-upload" 
            type="file" 
            accept="image/*" 
            className="hidden" 
            onChange={handleImageChange} 
          />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {user.username}
        </h2>
        <h3 className="text-gray-600 mb-6">
          {user.email}
        </h3>

        <div className="space-x-4">
          {selectedImage && (
            <button 
              onClick={handleImageUpload}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              Upload New Image
            </button>
          )}
          <button 
            onClick={openModal}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Change Password
          </button>
        </div>
      </div>

      <ChangePasswordModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handlePasswordChange}
      />
    </div>
  </div>
    );
};

export default ProfilePage;
