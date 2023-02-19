import { createSlice } from "@reduxjs/toolkit";

type Books = {
  id: number;
  BookTitle: string;
  PublicationDate: number;
  BookAuthor: Array<Omit<Authors, "numberOfBooks">>;
};

type Authors = {
  id: number;
  authorsName: string;
  numberOfBooks: number;
};

interface MainSlice {
  books: Books[] | [null];
  authors: Authors[] | [null];
  sortBooks: [];
}

const initialState: MainSlice = {
  books: [],
  authors: [],
  sortBooks: [],
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    createBook: (state: MainSlice, action) => {
      const { name, years, authors } = action.payload;
      console.log(authors, "AUTHOR");
      const LenBooks = state.books.length;
      const authorOnId = state.authors.filter((el) =>
        authors.includes(String(el.id))
      );

      // updateCOUNTforAuthor
      const newBook = {
        id: counterId(LenBooks),
        BookTitle: name,
        PublicationDate: years,
        // BookAuthor: authorOnId,
        get BookAuthor() {
          return state.authors.filter((el) => authors.includes(el.id));
        },
      };

      const newAuthors = state.authors.map((el) => {
        if (el.id === Number(authors)) {
          let count = el.numberOfBooks;
          return { ...el, numberOfBooks: (count += 1) };
        } else {
          return el;
        }
      });
      state.authors = state.authors.length ? newAuthors : [];
      state.books.push(newBook);
      //   ? updateAuthorState(state.authors, Number(authors))
      //   : [];

      // updateAuthorState()=>
    },
    createAuthor: (state: MainSlice, action) => {
      const { authors } = action.payload;
      const LenAuthors = state.books.length;

      const newAuthor: Author = {
        id: counterId(LenAuthors),
        authorsName: authors,
        numberOfBooks: 0,
      };
      state.authors.push(newAuthor);
    },
    deleteAuthor: (state: MainSlice, action) => {
      const { id } = action.payload;
      state.authors = deleteObjFromArray(state.authors, Number(id));
    },
    deleteBooks: (state: MainSlice, action) => {
      const { id, sortMode } = action.payload;
      state.books = deleteObjFromArray(
        sortMode ? state.sortBooks : state.books,
        Number(id)
      );
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

      const NewBooks = state.books.map((el) => {
        const ele = el.BookAuthor.map((eles) =>
          eles.id === Number(id)
            ? { ...eles, authorsName: authors }
            : { ...eles }
        );
        if (ele[0].id === el.id) {
          return { ...el, BookAuthor: ele };
        } else {
          return { ...el, BookAuthor: ele };
        }
      });

      state.books = NewBooks;
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
    filterBooks: (state: MainSlice, action) => {
      const sortBy = state.books
        .map((el) => {
          const findEl =
            el &&
            el.BookAuthor.filter(
              (elements) => Number(elements.id) === Number(action.payload.id)
            );
          if (findEl && findEl.length && findEl[0].id === action.payload.id) {
            return { ...el, BookAuthor: findEl };
          }
        })
        .filter((el) => el);
      state.sortBooks = sortBy;
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
  filterBooks,
} = mainSlice.actions;

export default mainSlice.reducer;

///HELPERS
const deleteObjFromArray = (arr: [], id: number | string) => {
  return arr.filter((elements) => elements.id !== id);
};

const counterForAuthorsBook = () => {};
const editAuthorsName = (arr: [], name: string, id: number) => {
  const authors = arr.map((el) => {
    if (el.id === id) {
      return { ...el, name: name };
    } else {
      return el;
    }
  });
  return authors;
};
const counterId = (b: number) => (b >= 0 ? b + 1 : 0);
const getEl = (arr: [], id: number) => arr.find((el) => el.id === id);

// const newAuthors = state.authors.map((el) => {
//   if (el && el.id === Number(authors)) {
//     let count = el.numberOfBooks;
//     return { ...el, numberOfBooks: (count += 1) };
//   } else {
//     return el;
//   }
// });
