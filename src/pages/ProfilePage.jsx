import ProfileCard from "../components/ProfileCard";
const ProfilePage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const handleUpdate = () => {
    alert("Update button clicked!");
  };
  return (
    <div className="d-flex justify-content-center mt-5">
      <ProfileCard
        email={user.email}
        password="********"
        onUpdate={handleUpdate}
      />
    </div>
  );
};
export default ProfilePage;
