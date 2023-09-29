import { Container } from "react-bootstrap";
import NotesPageLoggedInView from "../NotesPageLoggedInView";
import NotesPageLoggedOutView from "../NotesPageLoggedOutView";
import styles from "./styles/NotePage.module.css";
import { User } from "../../models/users";

interface NotesPageProps {
  loggedInUser: User | null;
}
const NotesPages = ({ loggedInUser }: NotesPageProps) => {
  return (
    <Container className={styles.notesPage}>
      <>
        {loggedInUser ? <NotesPageLoggedInView /> : <NotesPageLoggedOutView />}
      </>
    </Container>
  );
};

export default NotesPages;
