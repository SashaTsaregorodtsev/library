import { getParent, getSnapshot, types } from "mobx-state-tree";

const AuthorData = types.model("Author", {
  id: types.maybe(types.identifier),
  N_author: types.maybe(types.string),
  countBooks: types.maybe(types.integer),
});

const BookData = types.model("Book", {
  id: types.maybe(types.identifier),
  N_book: types.maybe(types.string),
  N_authors: types.maybe(types.reference(AuthorData)),
  yearsPublic: types.maybe(types.integer),
});

const Library = types
  .model("Library", {
    books: types.maybe(types.array(BookData)),
    authors: types.maybe(types.array(AuthorData)),
  })
  .actions((self) => ({
    createBook: (name: string, yearsPublic: number, author: string) => {
      const newBook = {
        // id: String(Math.floor(Math.random() * 1000)),
        id: "3",
        N_book: name,
        // N_authors:,
        yearsPublic,
        bookId: author,
        ///main.books[n].N_authors
      };
      self.books?.push(newBook);
    },
    createAuthor: (name: string) => {
      // const countBookForAuthor = self.books?.filter(
      //   (el) => el.N_authors === name
      // );
      const newAuthor = {
        id: String(Math.floor(Math.random() * 1000)),
        N_author: name,
        // countBooks: countBookForAuthor?.length,
      };
      self.authors?.push(newAuthor);
    },
  }))
  .views((self) => {
    return {
      allBooks() {
        return self.books;
      },
    };
  });

export default Library;
