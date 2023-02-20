export type Books = {
  id: number;
  BookTitle: string;
  PublicationDate: number;
  BookAuthor: Array<Omit<Authors, "numberOfBooks authorsName">>;
};

export type Authors = {
  id: number;
  authorsName: string;
  numberOfBooks: number;
};
