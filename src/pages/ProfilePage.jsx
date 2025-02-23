import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import ProfileCard from "../components/ProfileCard";
const ProfilePage = () => {
  const handleUpdate = () => {
    alert("Update button clicked!");
  };
  return (
    <div className="d-flex justify-content-center mt-5">
      <ProfileCard
        name="Çağrı Yolyapar"
        email="nightWhisper.com"
        password="********"
        onUpdate={handleUpdate}
      />
    </div>
  );
};
export default ProfilePage;
