import { Formik, useFormik } from "formik";
import * as yup from "yup";
import { FormEvent, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { createAuthor, editAuthor } from "../store1/slice";
import { Authors } from "../types/types";
import { useNavigate } from "react-router-dom";

type Props = {};

const ManageAuthor = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const allAuthors = useAppSelector((state) => state.main.authors);
  const [editMode, setEditMode] = useState(window.location.search);
  const QueryId = editMode && editMode.replace("?", " ");
  const [nameAuthor, setName] = useState<string>(
    editMode
      ? allAuthors?.find((el: Authors) => el.id === Number(QueryId))
          ?.authorsName
      : ""
  );

  const gos = (values: { fullName: string }) => {
    const { fullName } = values;
    editMode
      ? dispatch(editAuthor({ authors: fullName, id: QueryId }))
      : dispatch(createAuthor({ authors: fullName }));
    return navigate("/listsAuthors");
  };
  const schema = yup.object({
    fullName: yup.string().required(),
  });

  return (
    <Formik
      validationSchema={schema}
      initialValues={{ fullName: nameAuthor }}
      onSubmit={(values, action) => gos(values)}
    >
      {(props) => (
        <Form onSubmit={props.handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <h1>Создание автора</h1>
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
            Добавить
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ManageAuthor;
