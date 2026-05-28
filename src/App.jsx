import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PostsList from "./components/PostsList";
import PostDetail from "./components/PostDetail";

function App() {
  return (
    <Router>
      <header className="p-4 bg-blue-600 text-white flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Mathias CRUD app
        </Link>
      </header>
      <main className="container mx-auto p-4 min-h-screen">
        <Routes>
          <Route path="/" element={<PostsList />} />
          <Route path="/post/:id" element={<PostDetail />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
