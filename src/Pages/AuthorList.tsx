import { useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { deleteAuthor } from "../store/slice";
import { Link } from "react-router-dom";
import "../index.css";
import { routers } from "../consts";
type Props = {};

const AuthorList = (props: Props) => {
  const dispatch = useAppDispatch();
  const allAuthors = useAppSelector((state) => state.main.authors);
  const books = useAppSelector((state) => state.main.books);
  const [activeAuthor, setActiveAuthor] = useState<number | null>(null);
  const styleForTable = (id: number) =>
    activeAuthor && activeAuthor === id ? "darkgrey " : "white";
  const deleteFromState = () => {
    dispatch(deleteAuthor({ id: activeAuthor }));
  };
  return (
    <div className="List">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>ФИО</th>
            <th>Количество кинг</th>
          </tr>
        </thead>
        <tbody>
          {allAuthors?.map((el) => (
            <tr
              style={{
                backgroundColor: styleForTable(el.id),
              }}
              key={el?.id}
              onClick={() => setActiveAuthor(el && el.id)}
            >
              <td>{el?.id}</td>
              <td>{el?.authorsName}</td>
              <td>
                {
                  books.filter((book) => book.BookAuthor?.includes(el.id))
                    ?.length
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ display: "flex", marginTop: 10 }}>
        {activeAuthor ? (
          <Link to={routers["managmentAuthors"] + "?" + activeAuthor}>
            <Button variant="primary">Добавить</Button>
          </Link>
        ) : (
          <Link to={routers["managmentAuthors"]}>
            <Button variant="primary">Добавить</Button>
          </Link>
        )}

        <Button
          onClick={deleteFromState}
          style={{ marginLeft: 5 }}
          variant="danger"
        >
          Удалить
        </Button>
      </div>
    </div>
  );
};

export default AuthorList;
