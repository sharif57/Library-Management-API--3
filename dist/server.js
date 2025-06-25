"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
let server;
const PORT = 5000;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect("mongodb+srv://mongodb:w9xhVlJq30Yt8qhG@cluster0.cwjeixv.mongodb.net/todosDB?retryWrites=true&w=majority&appName=Cluster0");
            console.log('Connected to MongoDB Using Mongoose!!');
            server = app_1.default.listen(PORT, () => {
                console.log(`Server is running on port ${PORT}`);
            });
            console.log("Connected to MongoDB Using Mongoose!!");
        }
        catch (error) {
            console.log(error);
        }
    });
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
