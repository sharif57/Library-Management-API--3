import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";

let server: Server;

const PORT = 5000
async function main() {
  try {
    await mongoose.connect("mongodb+srv://mongodb:w9xhVlJq30Yt8qhG@cluster0.cwjeixv.mongodb.net/todosDB?retryWrites=true&w=majority&appName=Cluster0");
    console.log('Connected to MongoDB Using Mongoose!!');
    server = app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
    console.log("Connected to MongoDB Using Mongoose!!");
  } catch (error) {
    console.log(error);
  }
}

main();


// import mongoose from 'mongoose';
// import app from './app';

// const uri = 'mongodb+srv://mongodb:w9xhVlJq30Yt8qhG@cluster0.cwjeixv.mongodb.net/todosDB?retryWrites=true&w=majority&appName=Cluster0';
// const port = 5000;

// mongoose.connect(uri).then(() => {
//   console.log('Connected to MongoDB');
//   app.listen(port, () => console.log(`Server running on port ${port}`));
// }).catch(err => console.error('MongoDB connection error:', err)