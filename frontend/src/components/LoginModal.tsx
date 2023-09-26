import { useForm } from "react-hook-form";
import { User } from "../models/users";
import * as NotesApi from "../network/notes_api";
import { Form, Button, Modal } from "react-bootstrap";
import TextInputField from "./form/textInputField";
import styleUtil from "../styles/Utils.module.css";
import { LoginCredentials } from "../network/notes_api";

interface LoginModalProps {
  onDismiss: () => void;
  onLoginSuccessful: (user: User) => void;
}

const LoginModal = ({ onDismiss, onLoginSuccessful }: LoginModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginCredentials>();

  async function onSubmit(credentials: LoginCredentials) {
    try {
      const user = await NotesApi.logIn(credentials);
      onLoginSuccessful(user);
    } catch (error) {
      alert(error);
      console.error(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Log In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            name="userName"
            label="Name"
            type="text"
            placeholder="UserName"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.userName}
          />

          <TextInputField
            name="userPassword"
            label="Password"
            type="password"
            placeholder="User Password"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.userPassword}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className={styleUtil.width100}
          >
            Log In
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
