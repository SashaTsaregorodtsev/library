import { Formik, FormikHelpers, useFormik } from "formik";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { createAuthor, editAuthor } from "../store/slice";
import { Authors } from "../types/types";
import { useNavigate } from "react-router-dom";
import { authorSchema } from "../yupSchema/schema";

type ValuesFormik = {
  fullName: string | undefined;
};

const ManageAuthor = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const allAuthors = useAppSelector((state) => state.main.authors);
  const editMode = window.location.search;
  const QueryId = editMode && editMode.replace("?", " ");
  const [nameAuthor, setName] = useState(
    editMode
      ? allAuthors?.find((el: Authors) => el.id === Number(QueryId))
          ?.authorsName
      : ""
  );

  const submitAuthor = (values: ValuesFormik) => {
    const { fullName } = values;
    if (editMode) {
      dispatch(editAuthor({ authors: fullName, id: QueryId }));
    } else {
      dispatch(createAuthor({ authors: fullName }));
    }
    return navigate("/listsAuthors");
  };

  return (
    <Formik
      validationSchema={authorSchema}
      initialValues={{ fullName: nameAuthor }}
      onSubmit={(values, action) => submitAuthor(values)}
    >
      {(props) => (
        <Form onSubmit={props.handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <h1>Создание автора</h1>
            {props.touched.fullName && props.errors.fullName ? (
              <div>{props.errors.fullName}</div>
            ) : null}
            <Form.Control
              required
              style={{ width: "40%" }}
              value={props.values.fullName}
              onChange={props.handleChange}
              type="text"
              name="fullName"
              placeholder="Введите ФИО автора"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            {editMode ? "Редактировать" : "Добавить"}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ManageAuthor;
