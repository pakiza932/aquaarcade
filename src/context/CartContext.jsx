import { createContext, useContext, useEffect, useReducer, useState, useRef } from "react";
import { FREE_DELIVERY_AT, DELIVERY_FEE } from "../data/products.js";
import { playCoin } from "../sound.js";

const CartContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const existing = state.find((i) => i.id === action.product.id);
      if (existing) {
        return state.map((i) => (i.id === existing.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...state, { ...action.product, qty: 1 }];
    }
    case "INC":
      return state.map((i) => (i.id === action.id ? { ...i, qty: i.qty + 1 } : i));
    case "DEC":
      return state
        .map((i) => (i.id === action.id ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0);
    case "REMOVE":
      return state.filter((i) => i.id !== action.id);
    case "CLEAR":
      return [];
    default:
      return state;
  }
}

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem("aqua-cart")) || [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(reducer, [], loadCart);
  const [toast, setToast] = useState("");
  const timer = useRef(null);

  useEffect(() => {
    localStorage.setItem("aqua-cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    dispatch({ type: "ADD", product });
    playCoin();
    setToast(`${product.emoji} ${product.title} added to inventory!`);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(""), 2200);
  };

  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  const subtotal = cart.reduce((s, i) => s + i.qty * i.price, 0);
  const delivery = cart.length === 0 || subtotal >= FREE_DELIVERY_AT ? 0 : DELIVERY_FEE;
  const grandTotal = subtotal + delivery;

  return (
    <CartContext.Provider
      value={{ cart, dispatch, addToCart, toast, totalItems, subtotal, delivery, grandTotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
