import { Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import LoginPage from "../pages/LoginPage";
import ProfilePage from "../pages/ProfilePage";
import Register from "../pages/RegisterPage";
import ProtectedRoute from "../components/ProtectedRoute"; // Protected Route ekledik

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/Register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/Profile" element={<ProfilePage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
