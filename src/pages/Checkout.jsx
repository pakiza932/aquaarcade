import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { formatPrice } from "../data/products.js";

export default function Checkout() {
  const { cart, dispatch, subtotal, delivery, grandTotal } = useCart();
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });
  const [errors, setErrors] = useState({});
  const [orderId, setOrderId] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Player name is required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email";
    if (!/^(\+92|0)?3\d{9}$/.test(form.phone.replace(/[\s-]/g, "")))
      e.phone = "Enter a valid Pakistani mobile number (03XXXXXXXXX)";
    if (form.address.trim().length < 10) e.address = "Enter your full delivery address";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length === 0) {
      setOrderId("AQ-" + Date.now().toString().slice(-6));
      dispatch({ type: "CLEAR" });
    }
  };

  if (orderId) {
    return (
      <div className="container center">
        <h2 className="pixel small">🏆 Quest Complete!</h2>
        <p>Order <strong className="price">{orderId}</strong> confirmed. Thank you, {form.name}!</p>
        <p>Your loot is on its way. Pay cash on delivery.</p>
        <Link to="/" className="cta">Keep exploring</Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container center">
        <h2 className="pixel small">Nothing to checkout</h2>
        <Link to="/" className="cta">Go to shop</Link>
      </div>
    );
  }

  const fields = [
    ["name", "Player name"],
    ["email", "Email"],
    ["phone", "Mobile (03XXXXXXXXX)"],
  ];

  return (
    <div className="container checkout">
      <form onSubmit={handleSubmit}>
        <h2 className="pixel small">Checkout</h2>
        {fields.map(([f, label]) => (
          <div className="field" key={f}>
            <input name={f} placeholder={label} value={form[f]} onChange={handleChange} />
            {errors[f] && <small className="err">{errors[f]}</small>}
          </div>
        ))}
        <div className="field">
          <textarea name="address" rows="3" placeholder="Delivery address" value={form.address} onChange={handleChange} />
          {errors.address && <small className="err">{errors.address}</small>}
        </div>
        <button type="submit" className="cta-btn">Confirm Order (Cash on Delivery)</button>
      </form>

      <aside className="summary">
        <h3>Order Summary</h3>
        {cart.map((i) => (
          <p key={i.id}>{i.emoji} {i.title} × {i.qty} <span>{formatPrice(i.price * i.qty)}</span></p>
        ))}
        <hr />
        <p>Subtotal <span>{formatPrice(subtotal)}</span></p>
        <p>Delivery <span>{delivery === 0 ? "FREE" : formatPrice(delivery)}</span></p>
        <h3>Total <span className="price">{formatPrice(grandTotal)}</span></h3>
      </aside>
    </div>
  );
}
