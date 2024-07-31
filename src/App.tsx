import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import Register from './pages/register/Register';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Profile from './pages/profile/Profile';
import CartPage from './pages/cart/Cart';
import OrderP from './pages/order/OrderPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/orders/:id" element={<OrderP />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
