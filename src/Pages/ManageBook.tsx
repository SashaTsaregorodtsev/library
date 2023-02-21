import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { createBook, editBook } from "../store/slice";
import { Field, Formik } from "formik";
import CustomSelect from "../Components/CustomSelect";
import { Books } from "../types/types";
import { useNavigate } from "react-router-dom";
import { bookSchema } from "../yupSchema/schema";

const ManageBook = () => {
  const navigate = useNavigate();
  const editMode = window.location.search;
  const QueryId = editMode && editMode.replace("?", " ");
  const dispatch = useAppDispatch();
  const books = useAppSelector((state) => state.main.books);
  const allAuthors = useAppSelector((state) => state.main.authors);
  const editBooks: any =
    editMode && books.find((el: Books) => el.id === Number(QueryId));

  const authorsForSelect = allAuthors.map((el) => ({
    ...el,
    label: el?.authorsName,
    value: el?.id,
  }));

  const submitBook = (values: any) => {
    const { bookName, yearsPublic, authors } = values;
    if (editMode) {
      dispatch(
        editBook({
          id: Number(QueryId),
          name: bookName,
          years: yearsPublic,
          authors,
        })
      );
    } else {
      dispatch(createBook({ name: bookName, years: yearsPublic, authors }));
    }
    return navigate("/listsBooks");
  };

  return (
    <Formik
      validationSchema={bookSchema}
      initialValues={{
        bookName: editMode ? editBooks?.BookTitle : "",
        yearsPublic: editMode ? editBooks?.PublicationDate : "",
        authorsArray: authorsForSelect,
      }}
      onSubmit={(values, action) => submitBook(values)}
    >
      {(props) => (
        <Form onSubmit={props.handleSubmit}>
          <h1>Создание книги</h1>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Название</Form.Label>
            {props.touched.bookName && props.errors.bookName ? (
              <div>Должно быть строкой</div>
            ) : null}
            <Form.Control
              required
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
              required
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
          <Button style={{ marginTop: 15 }} variant="primary" type="submit">
            {editMode ? "Редактировать" : "Добавить"}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ManageBook;
