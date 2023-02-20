import { useState } from "react";
import * as yup from "yup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { createBook, editBook } from "../store1/slice";
import { Field, Formik } from "formik";
import CustomSelect from "../Components/CustomSelect";
import { Books } from "../types/types";
import { useNavigate } from "react-router-dom";

type Props = {};

const ManageBook = (props: Props) => {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(window.location.search);
  const QueryId = editMode && editMode.replace("?", " ");
  const dispatch = useAppDispatch();
  const books = useAppSelector((state) => state.main.books);
  const allAuthors = useAppSelector((state) => state.main.authors);
  const editBooks =
    editMode && books.find((el: Books) => el.id === Number(QueryId));

  const authorsForSelect = allAuthors.map((el) => ({
    ...el,
    label: el?.authorsName,
    value: el?.id,
  }));

  const gos = (values: {
    bookName: string;
    yearsPublic: number;
    authors: [];
  }) => {
    console.log(values, "qwddwq");
    const { bookName, yearsPublic, authors } = values;
    editMode
      ? dispatch(
          editBook({
            id: Number(QueryId),
            name: bookName,
            years: yearsPublic,
            authors,
          })
        )
      : dispatch(createBook({ name: bookName, years: yearsPublic, authors }));
    return navigate("/listsBooks");
  };
  const schema = yup.object({
    bookName: yup.string().required(),
    yearsPublic: yup.number().required(),
    authorsArray: yup.array().required(),
  });

  return (
    <Formik
      validationSchema={schema}
      initialValues={{
        bookName: editMode && editBooks.BookTitle,
        yearsPublic: editMode && editBooks.PublicationDate,
        authorsArray: authorsForSelect,
      }}
      onSubmit={(values, action) => gos(values)}
    >
      {(props) => (
        <Form onSubmit={props.handleSubmit}>
          <h1>Создание книги</h1>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Название</Form.Label>
            <Form.Control
              value={props.values.bookName}
              onChange={props.handleChange}
              type="text"
              name="bookName"
              placeholder="Введите название книги"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Год издания</Form.Label>
            <Form.Control
              value={props.values.yearsPublic}
              onChange={props.handleChange}
              type="number"
              name="yearsPublic"
              placeholder="Введите год издания книги"
            />
          </Form.Group>
          <Field
            className="custom-select"
            name="authors"
            options={props.values.authorsArray}
            component={CustomSelect}
            placeholder="Выберите авторов
            ..."
            isMulti={true}
          />
          <Button variant="primary" type="submit">
            {editMode ? "Редактировать" : "Добавить"}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ManageBook;
