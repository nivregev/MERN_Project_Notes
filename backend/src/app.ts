import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import NotesRoutes from "./routes/notesRoutes";
import morgan from "morgan";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use("/api/notes", NotesRoutes);

app.use((req, res, next) => {
  next(Error("Endpoint not found"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = "An Unknown Error Message";
  if (error instanceof Error) errorMessage = error.message;
  res.status(500).json({ error: errorMessage });
});

export default app;
