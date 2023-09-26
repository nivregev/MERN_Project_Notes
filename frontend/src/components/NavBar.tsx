import { Container, Navbar } from "react-bootstrap";
import { User } from "../models/users";

interface NavBarProps {
  loggedInUser: User | null;
  onSignUpClicked: () => void;
  onLogInClicked: () => void;
  onLogOutSuccessful: () => void;
}

const NavBar = ({
  loggedInUser,
  onSignUpClicked,
  onLogInClicked,
  onLogOutSuccessful,
}: NavBarProps) => {
  return (
    <Navbar className="bg-primary mb-2" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand>Cool Notes App</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default NavBar;
