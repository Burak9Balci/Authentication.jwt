import { Link, Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import LoginPage from "../pages/LoginPage";
import ProfilePage from "../pages/ProfilePage";
import Register from "../pages/RegisterPage";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/Profile" element={<ProfilePage />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/Register" element={<Register />} />
      </Route>
    </Routes>
  );
};
export default AppRoutes;
