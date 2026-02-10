import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BooksProvider } from './context/BooksContext';
import Header from './components/Header/Header';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import AddBook from './pages/AddBook';
import './App.css';

function App() {
  return (
    <BooksProvider>
      <Router>
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/categorias/:category" element={<CategoryPage />} />
              <Route path="/adicionar" element={<AddBook />} />
            </Routes>
          </main>
        </div>
      </Router>
    </BooksProvider>
  );
}

export default App;
