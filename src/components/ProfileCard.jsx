import { Card, Button } from "react-bootstrap";
import { PencilSquare } from "react-bootstrap-icons";

const ProfileCard = ({ email, password, onUpdate }) => {
  return (
    <Card
      style={{ width: "18rem" }}
      className="text-center shadow-lg p-3 mb-5 bg-white rounded"
    >
      <Card.Body>
        <Card.Title>Profile</Card.Title>
        <Card.Text>
          <strong>Email:</strong> {email} <br />
          <strong>Password:</strong> {"*".repeat(password.length)}
        </Card.Text>
        <Button variant="primary" onClick={onUpdate}>
          <PencilSquare size={20} /> Update
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProfileCard;
