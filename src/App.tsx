import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import BookList from "./Pages/BookList";
import AuthorList from "./Pages/AuthorList";
import ManageBook from "./Pages/ManageBook";
import ManageAuthor from "./Pages/ManageAuthor";
import { useEffect } from "react";
import "./index.css";
import { routers } from "./consts";
function App() {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/") {
      return navigate(routers["managmentAuthors"]);
    }
  }, []);
  return (
    <>
      <div className="Nav">
        <Link to={routers["listsBooks"]}>Список книг</Link>
        <Link to={routers["listsAuthors"]}>Сисок авторов</Link>
        <Link to={routers["managmentAuthors"]}>Создание автора</Link>
        <Link to={routers["managmentBooks"]}>Создание книги</Link>
      </div>
      <Routes>
        <Route path={routers["listsBooks"]} element={<BookList />} />
        <Route path={routers["listsAuthors"]} element={<AuthorList />} />
        <Route path={routers["managmentBooks"]} element={<ManageBook />} />
        <Route path={routers["managmentAuthors"]} element={<ManageAuthor />} />
      </Routes>
    </>
  );
}

export default App;
