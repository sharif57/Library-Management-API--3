import express, { Request, Response } from "express";
import Book from "../models/book.model";
import Borrow from "../models/borrow.model";

export const borrowBooks = express.Router();

// borrow a book
borrowBooks.post(
  "/borrow",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { book, quantity, dueDate } = req.body;
      const bookDoc = await Book.findById(book);
      if (!bookDoc || bookDoc.copies < quantity) {
        res
          .status(400)
          .json({ success: false, message: "Not enough copies available" });
        return;
      }

      bookDoc.copies -= quantity;
      await bookDoc.save();

      const borrow = await Borrow.create({ book, quantity, dueDate });
      res.status(201).json({
        success: true,
        message: "Book borrowed successfully",
        data: borrow,
      });
    } catch (error) {
      res
        .status(400)
        .json({ success: false, message: "Error borrowing book", error });
    }
  }
);


// get all borrowed books
borrowBooks.get(
  "/borrow",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const summary = await Borrow.aggregate([
        {
          $group: {
            _id: "$book",
            totalQuantity: { $sum: "$quantity" },
          },
        },
        {
          $lookup: {
            from: "books",
            localField: "_id",
            foreignField: "_id",
            as: "bookInfo",
          },
        },
        {
          $unwind: "$bookInfo",
        },
        {
          $project: {
            book: {
              title: "$bookInfo.title",
              isbn: "$bookInfo.isbn",
            },
            totalQuantity: 1,
          },
        },
      ]);

      res.json({
        success: true,
        message: "Borrowed books summary retrieved successfully",
        data: summary,
      });
    } catch (error) {
      res
        .status(400)
        .json({ success: false, message: "Error retrieving summary", error });
    }
  }
);
