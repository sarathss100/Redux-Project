import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import UserManagement from "./pages/UserManagement";
import PrivateRoute from "./components/PrivateRoute";
import AdminPage from "./pages/AdminPage";
import AdminRoute from "./components/AdminRoute";
import RedirectRoute from "./components/RedirectRoute";

const App = function() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={ <RedirectRoute element={<LoginPage />} />} />
        <Route path='/register' element={ <RedirectRoute element={<RegisterPage />} />} />

        {/* Protetected routes */}
        <Route path='/' element={<PrivateRoute element= {<HomePage />} />} />
        <Route path='/profile' element={<PrivateRoute element= {<ProfilePage />} />} />
        <Route path='/user' element={<PrivateRoute element= {<UserManagement />} />} />
        <Route path='/admin/usermanagement' element={<PrivateRoute element={ <AdminRoute element={<AdminPage />} />} />} />
      </Routes>
    </Router>
  );
};

export default App;