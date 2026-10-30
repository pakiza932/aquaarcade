import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { products, formatPrice } from "../data/products.js";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === Number(id));

  if (!product) return <div className="container center"><h2>Item not found 🐙</h2></div>;

  return (
    <div className="container">
      <Link to="/" className="back">← Back to shop</Link>
      <div className={`detail rarity-${product.rarity.toLowerCase()}`}>
        <div className="art big">
          <span className="emoji float">{product.emoji}</span>
        </div>
        <div>
          <span className="rarity-tag static">{product.rarity}</span>
          <h2 className="pixel title">{product.title}</h2>
          <span className="cat">{product.category}</span>
          <p className="desc">{product.description}</p>

          <div className="stats">
            {Object.entries(product.stats).map(([name, val]) => (
              <div className="stat" key={name}>
                <span>{name}</span>
                <div className="bar"><div className="fill" style={{ width: `${val}%` }} /></div>
                <b>{val}</b>
              </div>
            ))}
          </div>

          <h3 className="price big-price">{formatPrice(product.price)}</h3>
          <button className="cta-btn" onClick={() => addToCart(product)}>+ Add to Inventory</button>
        </div>
      </div>
    </div>
  );
}
