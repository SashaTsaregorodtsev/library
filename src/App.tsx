import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import BookList from "./Pages/BookList";
import AuthorList from "./Pages/AuthorList";
import ManageBook from "./Pages/ManageBook";
import ManageAuthor from "./Pages/ManageAuthor";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/") {
      return navigate("/managmentAuthors");
    }
  }, []);
  return (
    <>
      <div style={{ background: "#0d6efd" }}></div>
      <Routes>
        <Route path="/listsBooks" element={<BookList />} />
        <Route path="/listsAuthors" element={<AuthorList />} />
        <Route path="/managmentBooks" element={<ManageBook />} />
        <Route path="/managmentAuthors" element={<ManageAuthor />} />
      </Routes>
    </>
  );
}

export default App;
