import { useState, useEffect } from "react";
import { User } from "./models/users";
import SignUpModel from "./components/SignUpModel";
import LoginModal from "./components/LoginModal";
import NavBar from "./components/NavBar";
import * as NoteApi from "./network/notes_api";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import NotesPage from "./components/pages/NotesPage";
import PrivacyPage from "./components/pages/PrivacyPage";
import NotFoundPage from "./components/pages/NotFoundPage";
import styles from "./styles/App.module.css";

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
    <BrowserRouter>
      <div>
        <NavBar
          loggedInUser={loggedInUser}
          onLogInClicked={() => setShowLoginModal(true)}
          onSignUpClicked={() => setShowSignUpModel(true)}
          onLogOutSuccessful={() => setLoggedInUser(null)}
        />

        <Container className={styles.pageContainer}>
          <Routes>
            <Route
              path="/"
              element={<NotesPage loggedInUser={loggedInUser} />}
            />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
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
    </BrowserRouter>
  );
}

export default App;
