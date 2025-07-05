import express, { Application, Request, Response } from "express";
import { model, Schema } from "mongoose";
import { bookRoutes } from "./app/controllers/book.controller";
import { borrowBooks } from "./app/controllers/borrow.controller";
import cors from "cors";

const app = express();
app.use(express.json());

const allowedOrigins = [
  "https://books-i2gx.vercel.app",
  "https://library-management-api-3.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api", bookRoutes);
app.use("/api", borrowBooks);

app.get("/", async (req: Request, res: Response) => {
  res.send("Hello");
});

export default app;
