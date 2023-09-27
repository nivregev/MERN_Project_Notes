import { Container } from "react-bootstrap";
import styles from "./styles/NotePage.module.css";
import SignUpModel from "./components/SignUpModel";
import LoginModal from "./components/LoginModal";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div>
      <NavBar
        loggedInUser={null}
        onLogInClicked={() => {}}
        onSignUpClicked={() => {}}
        onLogOutSuccessful={() => {}}
      />

      <Container className={styles.notesPage}>
        {false && (
          <SignUpModel onDismiss={() => {}} onSignUpSuccessful={() => {}} />
        )}

        {false && (
          <LoginModal onDismiss={() => {}} onLoginSuccessful={() => {}} />
        )}
      </Container>
    </div>
  );
}

export default App;
