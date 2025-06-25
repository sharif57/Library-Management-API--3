import express, { Application, Request, Response } from "express";
import { model, Schema } from "mongoose";
import { bookRoutes } from "./app/controllers/book.controller";
import { borrowBooks } from "./app/controllers/borrow.controller";

const app = express();
app.use(express.json());

app.use("/api", bookRoutes);
app.use("/api", borrowBooks);

app.get("/", async(req: Request, res: Response) => {
  res.send("Hello")
})

export default app;
