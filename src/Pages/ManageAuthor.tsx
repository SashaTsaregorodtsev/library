import { FormEvent, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { createAuthor, editAuthor } from "../store1/slice";

type Props = {};

const ManageAuthor = (props: Props) => {
  const dispatch = useAppDispatch();
  const allAuthors = useAppSelector((state) => state.main.authors);
  const books = useAppSelector((state) => state.main.books);
  const [editMode, setEditMode] = useState(window.location.search);
  const QueryId = editMode && editMode.replace("?", " ");
  const [name, setName] = useState("");

  const gos = (event: FormEvent) => {
    editMode
      ? dispatch(editAuthor({ authors: name, id: QueryId }))
      : dispatch(createAuthor({ authors: name }));
    event.preventDefault();
  };
  console.log(books, "BOOKS");
  useEffect(() => {
    setName(
      editMode &&
        allAuthors?.find((el) => el.id === Number(QueryId))?.authorsName
    );
  }, []);
  return (
    <>
      <div style={{ margin: 10 }}>
        <Form onSubmit={gos}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Инициалы автора</Form.Label>
            <Form.Control
              style={{ width: "40%" }}
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Введите ФИО автора"
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Добавить
          </Button>
        </Form>
      </div>
    </>
  );
};

export default ManageAuthor;
