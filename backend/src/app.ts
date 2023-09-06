import "dotenv/config";
import express from "express";
import NoteModel from "./models/node";

const app = express();

app.get("/", async (req, res) => {
  const notes = await NoteModel.find().exec();
  res.status(200).json(notes);
});

export default app;
