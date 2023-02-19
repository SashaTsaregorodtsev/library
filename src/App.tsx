import { observer } from "mobx-react-lite";
import { Route, Routes } from "react-router-dom";
import BookList from "./Pages/BookList";
import AuthorList from "./Pages/AuthorList";
import ManageBook from "./Pages/ManageBook";
import ManageAuthor from "./Pages/ManageAuthor";

function App() {
  return (
    <>
      <div style={{ background: "#0d6efd" }}></div>
      <Routes>
        <Route path="/listsBooks" element={<BookList />} />
        <Route path="/listsAuthors" element={<AuthorList />} />
        <Route path="/managmentBook" element={<ManageBook />} />
        <Route path="/managmentAuthors" element={<ManageAuthor />} />
      </Routes>
    </>
  );
}

export default App;
