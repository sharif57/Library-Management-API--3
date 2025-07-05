import express, { Request, Response } from "express";
import { bookRoutes } from "./app/controllers/book.controller";
import { borrowBooks } from "./app/controllers/borrow.controller";
import cors from "cors";

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        "https://books-i2gx.vercel.app",
        "http://localhost:3000", // For local development
      ];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

app.use("/api", bookRoutes);
app.use("/api", borrowBooks);

app.get("/", async (req: Request, res: Response) => {
  res.send("Hello");
});

export default app;
