import { useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { deleteAuthor } from "../store1/slice";

type Props = {};

const AuthorList = (props: Props) => {
  const books = useAppSelector((state) => state.main.books);
  const dispatch = useAppDispatch();
  const allAuthors = useAppSelector((state) => state.main.authors);
  const [activeAuthor, setActiveAuthor] = useState<number | null>(null);
  const deleteFromState = () => {
    dispatch(deleteAuthor({ id: activeAuthor }));
  };
  console.log(activeAuthor, "authors");
  return (
    <>
      <Table striped bordered hover size="sm" variant="dark" responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>ФИО</th>
            <th>Количество кинг</th>
          </tr>
        </thead>
        <tbody>
          {allAuthors?.map((el) => (
            <tr key={el?.id} onClick={() => setActiveAuthor(el && el.id)}>
              <td>{el?.id}</td>
              <td>{el?.authorsName}</td>
              <td>{el?.numberOfBooks}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div style={{ display: "flex", marginTop: 10 }}>
        {activeAuthor ? (
          <Button href={`/managmentAuthors?${activeAuthor}`} variant="primary">
            Добавить
          </Button>
        ) : (
          <Button href="/managmentAuthors" variant="primary">
            Добавить
          </Button>
        )}

        <Button
          onClick={deleteFromState}
          style={{ marginLeft: 5 }}
          variant="danger"
        >
          Удалить
        </Button>
      </div>
    </>
  );
};

export default AuthorList;
