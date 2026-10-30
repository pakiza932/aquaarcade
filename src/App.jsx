import { Routes, Route } from "react-router-dom";
import SoundToggle from "./components/SoundToggle.jsx";
import Navbar from "./components/Navbar.jsx";
import Toast from "./components/Toast.jsx";
import Home from "./pages/Home.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<div className="container center"><h2>404 - Lost at sea 🌊</h2></div>} />
      </Routes>
      <footer className="footer">
  <span className="pixel">AquaArcade</span> © 2026 · Built with React.js
  <br />
  Developed by <b>Pakiza Syed</b> · Roll No: <b>24-Arid-5035</b> · Submitted to: <b>Mam Samra</b>
</footer>
      <Toast />
      <SoundToggle />
    </>
  );
}
