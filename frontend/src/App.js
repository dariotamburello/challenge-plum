import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './pages/HomePage';
import PizzasPage from './pages/PizzasPage';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pizzas" element={<PizzasPage />} />
      </Routes>
    </Router>
    </>
    
  );
}

export default App;
