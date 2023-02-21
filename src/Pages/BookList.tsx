import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import { deleteBooks } from "../store/slice";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { Books } from "../types/types";
import { Link } from "react-router-dom";
import "../index.css";
import { routers } from "../consts";

type Props = {};

const BookList = (props: Props) => {
  const dispatch = useAppDispatch();
  const [activeBook, setActiveBook] = useState<number | null>(null);
  const [activeAuthor, setActiveAuthor] = useState<number>(0);
  const books = useAppSelector((state) => state.main.books);
  const authors = useAppSelector((state) => state.main.authors);
  const [list, useList] = useState<Array<Books> | null>(books);
  const deleteBook = () => dispatch(deleteBooks({ id: activeBook }));
  const styleForTable = (id: number) =>
    activeBook && activeBook === id ? "darkgrey " : "white";
  const filterByAuthor = () => {
    if (activeAuthor) {
      const filtredBooks = books?.filter((el: Books) =>
        el?.BookAuthor?.includes(activeAuthor)
      );
      useList(filtredBooks);
    }
  };

  useEffect(() => {
    useList(books);
  }, [books]);

  return (
    <div className="List">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Название</th>
            <th>Автор(ы)</th>
            <th>Год издания</th>
          </tr>
        </thead>
        <tbody>
          {list?.map((el) => (
            <tr
              style={{
                backgroundColor: styleForTable(el.id),
              }}
              key={el?.id}
              onClick={() => setActiveBook(el.id)}
            >
              <td>{el?.id}</td>
              <td>{el?.BookTitle}</td>
              <td>
                {authors.map((author) =>
                  el?.BookAuthor?.includes(author?.id)
                    ? author?.authorsName
                    : null
                )}
              </td>
              <td>{el?.PublicationDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="Footer">
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Фильтр
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {authors?.map((el) => (
              <Dropdown.Item
                onClick={() => setActiveAuthor(el.id)}
                key={el?.id}
              >
                {el?.authorsName}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
          <Button
            style={{ marginLeft: 10 }}
            onClick={filterByAuthor}
            variant="primary"
          >
            Применить фильтр
          </Button>
        </Dropdown>
        <div style={{ display: "flex", marginTop: 10 }}>
          {activeBook && (
            <Link to={routers["managmentBooks"] + "?" + activeBook}>
              <Button variant="primary">Редактировать</Button>
            </Link>
          )}
          <Link to={routers["managmentBooks"]}>
            <Button style={{ marginLeft: 5 }} variant="primary">
              Добавить
            </Button>
          </Link>
          <Button
            onClick={deleteBook}
            style={{ marginLeft: 5 }}
            variant="danger"
          >
            Удалить
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookList;
