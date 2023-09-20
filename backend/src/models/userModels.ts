import { Schema, InferSchemaType, model } from "mongoose";

const userSchema = new Schema({
  userName: { type: String, required: true, unique: true },
  userEmail: { type: String, required: true, select: false, unique: true },
  userPassword: { type: String, required: true, select: false },
});

type User = InferSchemaType<typeof userSchema>;

export default model<User>("User", userSchema);
