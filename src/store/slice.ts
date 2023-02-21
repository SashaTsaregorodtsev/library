import { createSlice } from "@reduxjs/toolkit";
import { Authors, Books } from "../types/types";

interface MainSlice {
  books: Array<Books>;
  authors: Array<Authors>;
}

const initialState: MainSlice = {
  books: [],
  authors: [],
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    createBook: (state: MainSlice, action) => {
      const { name, years, authors } = action.payload;
      const authorOnId = authors;
      const ID =
        state.books.length > 0 &&
        state.books.reduce((acc, curr) => (acc.id > curr.id ? acc : curr));

      const newBook = {
        id: ID ? ID.id + 1 : 1,
        BookTitle: name,
        PublicationDate: years,
        BookAuthor: authorOnId,
      };
      state.books.push(newBook);
    },
    createAuthor: (state: MainSlice, action) => {
      const { authors } = action.payload;
      const ID =
        state.authors.length > 0 &&
        state.authors.reduce((acc, curr) => (acc.id > curr.id ? acc : curr));

      const newAuthor: Authors = {
        id: ID ? ID.id + 1 : 1,
        authorsName: authors,
      };
      state.authors.push(newAuthor);
    },
    deleteAuthor: (state: MainSlice, action) => {
      const { id } = action.payload;
      const booksWithDeletedId = state.books.map((el) => {
        if (el.BookAuthor.includes(id)) {
          return {
            ...el,
            BookAuthor: el.BookAuthor.filter((booksDel) => booksDel != id),
          };
        }
        return el;
      });
      state.books = booksWithDeletedId;
      state.authors = state.authors.filter((el) => el.id !== Number(id));
    },
    deleteBooks: (state: MainSlice, action) => {
      const { id } = action.payload;
      state.books = state.books.filter((el) => el.id !== id);
    },
    editAuthor: (state: MainSlice, action) => {
      const { authors, id } = action.payload;
      const newAuthorState = state.authors.map((el) => {
        if (el && el.id === Number(id)) {
          return { ...el, authorsName: authors };
        } else {
          return el;
        }
      });

      state.authors = newAuthorState;
    },
    editBook: (state: MainSlice, action) => {
      const { id, name, years, authors } = action.payload;
      const newBookState = state.books.map((el) => {
        if (el && el.id === Number(id)) {
          return {
            ...el,
            BookTitle: name,
            PublicationDate: years,
            BookAuthor: authors,
          };
        } else {
          return el;
        }
      });
      state.books = newBookState;
    },
  },
});

export const {
  createBook,
  createAuthor,
  deleteAuthor,
  deleteBooks,
  editAuthor,
  editBook,
} = mainSlice.actions;

export default mainSlice.reducer;
