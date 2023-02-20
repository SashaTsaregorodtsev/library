import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import { deleteBooks } from "../store1/slice";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { Books } from "../types/types";
type Props = {};

const BookList = (props: Props) => {
  const dispatch = useAppDispatch();
  const [activeBook, setActiveBook] = useState<number | null>(null);
  const [activeAuthor, setActiveAuthor] = useState<number | null>(null);
  const books = useAppSelector((state) => state.main.books);
  const authors = useAppSelector((state) => state.main.authors);
  const [list, useList] = useState(books);
  const [editMode, setEditMode] = useState(false);
  const deleteBook = () =>
    dispatch(deleteBooks({ id: activeBook, sortMode: editMode }));

  const filterByAuthor = () => {
    const filtredBooks = books?.filter((el: Books) =>
      el?.BookAuthor?.includes(activeAuthor)
    );
    useList(filtredBooks);
  };

  useEffect(() => {
    useList(books);
  }, [books]);

  return (
    <>
      <Table striped bordered hover size="sm" variant="dark" responsive>
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
            <tr key={el?.id} onClick={() => setActiveBook(el ? el.id : null)}>
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
      </Table>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Фильтр
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {authors?.map((el) => (
            <Dropdown.Item
              onClick={() => setActiveAuthor(el ? el.id : null)}
              key={el?.id}
            >
              {el?.authorsName}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
        <Button onClick={filterByAuthor} variant="primary">
          Применить фильтр
        </Button>
      </Dropdown>
      <div style={{ display: "flex", marginTop: 10 }}>
        <Button href={`/managmentBook?${activeBook}`} variant="primary">
          Редактировать
        </Button>
        <Button
          href="/managmentBook"
          style={{ marginLeft: 5 }}
          variant="primary"
        >
          Добавить
        </Button>
        <Button onClick={deleteBook} style={{ marginLeft: 5 }} variant="danger">
          Удалить
        </Button>
      </div>
    </>
  );
};

export default BookList;
