import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { formatPrice } from "../data/products.js";
import { Octopus, Fish } from "./Sea.jsx";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const topIsOctopus = product.id % 2 === 0;

  return (
    <div className={`card rarity-${product.rarity.toLowerCase()}`}>
      {topIsOctopus ? (
        <Octopus className="mascot top" />
      ) : (
        <Fish className="mascot top fishy" color="#ff4d6d" />
      )}
      <Fish className="mascot side" />

      <span className="rarity-tag">{product.rarity}</span>
      <Link to={`/product/${product.id}`} className="art">
        <span className="emoji float">{product.emoji}</span>
      </Link>
      <span className="cat">{product.category}</span>
      <h3>{product.title}</h3>
      <div className="card-bottom">
        <strong className="price">{formatPrice(product.price)}</strong>
        <button onClick={() => addToCart(product)}>+ Add</button>
      </div>
    </div>
  );
}
