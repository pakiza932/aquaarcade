import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

export default function Navbar() {
  const { totalItems } = useCart();
  return (
    <nav className="navbar">
      <Link to="/" className="logo pixel">🌊 AquaArcade</Link>
      <div className="nav-links">
        <NavLink to="/" end>Shop</NavLink>
        <NavLink to="/cart" className="inv-link">
          🎒 Inventory <span className="badge">{totalItems}</span>
        </NavLink>
      </div>
    </nav>
  );
}
