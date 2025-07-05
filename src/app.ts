// import express, { Application, Request, Response } from "express";
// import { model, Schema } from "mongoose";
// import { bookRoutes } from "./app/controllers/book.controller";
// import { borrowBooks } from "./app/controllers/borrow.controller";
// import cors from "cors";

// const app = express();
// app.use(express.json());

// app.use(
//   cors({
//     origin: "https://books-i2gx.vercel.app",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );


// app.use("/api", bookRoutes);
// app.use("/api", borrowBooks);

// app.get("/", async(req: Request, res: Response) => {
//   res.send("Hello")
// })

// export default app;
import express, { Application, Request, Response } from "express";
import cors from "cors";
import { bookRoutes } from "./app/controllers/book.controller";
import { borrowBooks } from "./app/controllers/borrow.controller";

const app: Application = express();

// ✅ Middlewares
app.use(express.json());

// ✅ CORS Configuration
app.use(
  cors({
    origin: "https://books-i2gx.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ Manual Headers for Vercel Compatibility (Just in Case)
app.use((req: Request, res: Response, next) => {
  res.header("Access-Control-Allow-Origin", "https://books-i2gx.vercel.app");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// ✅ Routes
app.use("/api", bookRoutes);
app.use("/api", borrowBooks);

// ✅ Default Route
app.get("/", (req: Request, res: Response) => {
  res.send("Library Management API is running.");
});

export default app;
