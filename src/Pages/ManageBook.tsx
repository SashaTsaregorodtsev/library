import { FormEvent, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { createBook, editBook } from "../store1/slice";

type Props = {};

const ManageBook = (props: Props) => {
  const [name, setName] = useState("");
  const [years, setYears] = useState("");
  const [authors, setAuthors] = useState([]);
  const [editMode, setEditMode] = useState(window.location.search);
  const QueryId = editMode && editMode.replace("?", " ");
  const dispatch = useAppDispatch();
  const books = useAppSelector((state) => state.main.books);
  const allAuthors = useAppSelector((state) => state.main.authors);

  console.log(books, "BOOKS");
  console.log(allAuthors, "AUHTORS");
  const gos = (event: FormEvent) => {
    editMode
      ? dispatch(editBook({ id: Number(QueryId), name, years, authors }))
      : dispatch(createBook({ name, years, authors }));
    event.preventDefault();
  };
  const sel = (e) => {
    setAuthors((prev) => {
      if (prev?.includes(e.target.value)) {
        return prev.filter((el) => el !== e.target.value);
      } else if (prev !== undefined) {
        return [...prev, e.target.value];
      } else {
        return e.target.value;
      }
    });
    e.preventDefault();
  };

  useEffect(() => {
    const editBooks = editMode && books.find((el) => el.id === Number(QueryId));
    setName(editMode && editBooks.BookTitle);
    setYears(editMode && editBooks.PublicationDate);
    setAuthors(editMode && editBooks.BookAuthor);
  }, []);

  return (
    <>
      <Form onSubmit={gos}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Название</Form.Label>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Введите название книги"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Год издания</Form.Label>
          <Form.Control
            value={years}
            onChange={(e) => setYears(e.target.value)}
            type="number"
            placeholder="Введите год издания книги"
          />
        </Form.Group>

        <Form.Select onChange={sel} multiple value={authors} size="sm">
          {allAuthors?.map((el) => {
            return (
              <option key={el?.id} value={el?.id}>
                {el?.authorsName}
              </option>
            );
          })}
        </Form.Select>
        <Button variant="primary" type="submit">
          {editMode ? "Редактировать" : "Добавить"}
        </Button>
      </Form>
    </>
  );
};

export default ManageBook;
