import { Schema, model } from 'mongoose';

const genreEnum = ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'];

const bookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, enum: genreEnum, required: true },
  isbn: { type: String, unique: true, required: true },
  description: { type: String },
  copies: { type: Number, min: 0, required: true },
  available: { type: Boolean, default: true },
}, { timestamps: true });

bookSchema.methods.checkAvailability = function () {
  this.available = this.copies > 0;
};

const Book = model('Book', bookSchema);
export default Book;