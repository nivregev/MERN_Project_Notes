import { Button } from "react-bootstrap";
import { User } from "../models/users";

interface NavBarLoggedOutViewProps {
  onSignUpClicked: () => void;
  onLoggedInClicked: () => void;
}

const NavBarLoggedOutView = ({
  onSignUpClicked,
  onLoggedInClicked,
}: NavBarLoggedOutViewProps) => {
  return (
    <>
      <Button onClick={onSignUpClicked}>Sign-Up</Button>
      <Button onClick={onLoggedInClicked}>Log-In</Button>
    </>
  );
};

export default NavBarLoggedOutView;
