import { Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import { User } from "./models/users";
import SignUpModel from "./components/SignUpModel";
import LoginModal from "./components/LoginModal";
import NavBar from "./components/NavBar";
import * as NoteApi from "./network/notes_api";
import NotesPageLoggedInView from "./components/NotesPageLoggedInView";
import NotesPageLoggedOutView from "./components/NotesPageLoggedOutView";
import styles from "./styles/NotePage.module.css";

function App() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  const [showSignUpModel, setShowSignUpModel] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await NoteApi.getLoggedInUser();
        setLoggedInUser(user);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLoggedInUser();
  }, []);

  return (
    <div>
      <NavBar
        loggedInUser={loggedInUser}
        onLogInClicked={() => setShowLoginModal(true)}
        onSignUpClicked={() => setShowSignUpModel(true)}
        onLogOutSuccessful={() => setLoggedInUser(null)}
      />

      <Container className={styles.notesPage}>
        <>
          {loggedInUser ? (
            <NotesPageLoggedInView />
          ) : (
            <NotesPageLoggedOutView />
          )}
        </>
      </Container>
      {showSignUpModel && (
        <SignUpModel
          onDismiss={() => {
            setShowSignUpModel(false);
          }}
          onSignUpSuccessful={(user) => {
            setLoggedInUser(user);
            setShowSignUpModel(false);
          }}
        />
      )}

      {showLoginModal && (
        <LoginModal
          onDismiss={() => {
            setShowLoginModal(false);
          }}
          onLoginSuccessful={(user) => {
            setLoggedInUser(user);
            setShowLoginModal(false);
          }}
        />
      )}
    </div>
  );
}

export default App;
