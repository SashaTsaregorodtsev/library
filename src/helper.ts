class Library {}

class Book {
  id: number = 0;
  NameAuthor: [] = [];
  NameBook: string = "";
  datePublic: number | null = null;

  constructor(nameA: [], nameB: string, date: number) {
    this.id += 1;
    this.NameAuthor = nameA;
    this.NameBook = nameB;
    this.datePublic = date;
  }
}

class Author {
  id: number = 0;
  Name: string = "";
  countBooks: number | null = null;

  constructor(name: string, count: number) {
    this.id += 1;
    this.Name = name;
    this.countBooks = count;
  }
}

const nBook = new Author();
