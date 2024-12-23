import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import UserManagement from "./pages/UserManagement";
import PrivateRoute from "./components/PrivateRoute";

const App = function() {
  return (
    <Router>
      <Routes>
        
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />

        {/* Protetected routes */}
        <Route path='/' element={<PrivateRoute element= {<HomePage />} />} />
        <Route path='/profile' element={<PrivateRoute element= {<ProfilePage />} />} />
        <Route path='/user' element={<PrivateRoute element= {<UserManagement />} />} />
      </Routes>
    </Router>
  );
};

export default App;