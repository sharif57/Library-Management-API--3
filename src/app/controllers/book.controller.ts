import express, { Request, Response } from "express";
import Book from "../models/book.model";

export const bookRoutes = express.Router();

// Create a new book
bookRoutes.post("/books", async (req: Request, res: Response) => {
  try {
    const book = await Book.create(req.body);
    console.log(book, "book");
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error) {
    console.log(error);

    res
      .status(400)
      .json({ success: false, message: "Validation failed", error });
  }
});

// get all books
bookRoutes.get("/books", async (req: Request, res: Response) => {
  try {
    const {
      filter,
      sortBy = "createdAt",
      sort = "asc",
      limit = 10,
    } = req.query;
    const query: any = filter ? { genre: filter } : {};
    const books = await Book.find(query)
      .sort({ [sortBy as string]: sort === "desc" ? -1 : 1 })
      .limit(Number(limit));
    res.json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Error retrieving books", error });
  }
});

// Get Book by ID
bookRoutes.get(
  "/books/:bookId",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const book = await Book.findById(req.params.bookId);
      if (!book) {
        res.status(404).json({ success: false, message: "Book not found" });
        return;
      }
      res.json({
        success: true,
        message: "Book retrieved successfully",
        data: book,
      });
    } catch (error) {
      res
        .status(400)
        .json({ success: false, message: "Error retrieving book", error });
    }
  }
);

// Update Book
bookRoutes.put(
  "/books/:bookId",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const book = await Book.findByIdAndUpdate(req.params.bookId, req.body, {
        new: true,
      });
      if (!book) {
        res.status(404).json({ success: false, message: "Book not found" });
        return;
      }
      res.json({
        success: true,
        message: "Book updated successfully",
        data: book,
      });
    } catch (error) {
      res
        .status(400)
        .json({ success: false, message: "Error updating book", error });
    }
  }
);

// delete single books
bookRoutes.delete(
  "/books/:bookId",
  async (req: Request, res: Response): Promise<void> => {
    try {
      await Book.findByIdAndDelete(req.params.bookId);
      res.json({
        success: true,
        message: "Book deleted successfully",
        data: null,
      });
    } catch (error) {
      res
        .status(400)
        .json({ success: false, message: "Error deleting book", error });
    }
  }
);
