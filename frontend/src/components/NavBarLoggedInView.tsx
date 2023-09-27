import { User } from "../models/users";
import * as NotesApi from "../network/notes_api";
import { Button, Navbar } from "react-bootstrap";

interface NavBarLoggedInViewProps {
  user: User;
  onLogOutSuccessful: () => void;
}

const NavBarLoggedInView = ({
  user,
  onLogOutSuccessful,
}: NavBarLoggedInViewProps) => {
  async function logout() {
    try {
      await NotesApi.logOut();
      onLogOutSuccessful();
    } catch (error) {
      alert(error);
      console.error(error);
    }
  }

  return (
    <>
      <Navbar.Text className="me-2">Signed in as: {user.username}</Navbar.Text>
      <Button onClick={logout}>Log-Out</Button>
    </>
  );
};

export default NavBarLoggedInView;
