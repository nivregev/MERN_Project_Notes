import { useForm } from "react-hook-form";
import { User } from "../models/users";
import { SignUpCredentials } from "../network/notes_api";
import * as NotesApi from "../network/notes_api";
import { Button, Form, Modal } from "react-bootstrap";
import TextInputField from "./form/textInputField";
import styleUtil from "../styles/Utils.module.css";

interface SignUpModelProps {
  onDismiss: () => void;
  onSignUpSuccessful: (user: User) => void;
}

const SignUpModel = ({ onDismiss, onSignUpSuccessful }: SignUpModelProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpCredentials>();

  async function onSubmit(credentials: SignUpCredentials) {
    try {
      const newUser = await NotesApi.signUp(credentials);
      onSignUpSuccessful(newUser);
    } catch (error) {
      alert(error);
      console.error(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
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
            name="userEmail"
            label="Email"
            type="text"
            placeholder="User Email"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.userEmail}
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
            Sign Up
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SignUpModel;
