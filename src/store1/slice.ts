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
      console.log(action.payload, "AUTHOR");
      const LenBooks = state.books.length;
      const authorOnId = state.authors
        .map((el) => {
          if (authors.includes(el?.id)) {
            return el?.id;
          }
        })
        .filter((el) => el);
      const newBook = {
        id: counterId(LenBooks),
        BookTitle: name,
        PublicationDate: years,
        BookAuthor: authorOnId,
      };

      const newAuthors = state.authors.map((el) => {
        if (el?.id === Number(authors)) {
          let count = el.numberOfBooks;
          return { ...el, numberOfBooks: (count += 1) };
        } else {
          return el;
        }
      });
      state.authors = state.authors.length ? newAuthors : [];
      state.books.push(newBook);
    },
    createAuthor: (state: MainSlice, action) => {
      const { authors } = action.payload;
      const LenAuthors = state.authors.length;

      const newAuthor: Author = {
        id: counterId(LenAuthors),
        authorsName: authors,
        numberOfBooks: 0,
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
      state.authors = deleteObjFromArray(state.authors, Number(id));
    },
    deleteBooks: (state: MainSlice, action) => {
      const { id } = action.payload;
      const authorsWithDeletedId = state.authors.map((el) => {
        if (el) {
          if (el.id === id) {
            return {
              ...el,
              numberOfBooks: (el.numberOfBooks -= 1),
            };
          }
          return el;
        }
      });
      state.authors = authorsWithDeletedId;
      state.books = deleteObjFromArray(state.books, id);
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
            BookAuthor: state.authors.filter((el) =>
              authors.includes(String(el.id))
            ),
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

///HELPERS
const deleteObjFromArray = (arr: [], id: number | string) => {
  return arr.filter((elements: Books | Authors) => elements.id !== id);
};

const counterId = (b: number) => (b >= 0 ? b + 1 : 0);
