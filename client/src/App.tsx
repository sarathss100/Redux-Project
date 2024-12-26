import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminUserManagement from "./pages/AdminUserManagement";
import RedirectRoute from "./components/RedirectRoute";
import PrivateRoute from "./components/PrivateRoute";
import UserManagement from "./pages/UserManagement";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./components/AdminRoute";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

const App = function () {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={ <RedirectRoute element={<LoginPage />} />} />
        <Route path='/register' element={ <RedirectRoute element={<RegisterPage />} />} />

        {/* Protetected routes */}
        <Route path='/' element={<PrivateRoute element= {<HomePage />} />} />
        <Route path='/profile' element={<PrivateRoute element= {<ProfilePage />} />} />
        <Route path='/user' element={<PrivateRoute element= {<UserManagement />} />} />
        <Route path='/admin/usermanagement' element={<PrivateRoute element={ <AdminRoute element={<AdminUserManagement />} />} />} />
        <Route path='/admin/dashboard' element={<PrivateRoute element={ <AdminRoute element={<AdminDashboard />} />} />} />
      </Routes>
    </Router>
  );
};

export default App;