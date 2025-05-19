import React, { useEffect, useState } from "react";
import axios from "../utils/api";
import "./CartPage.css";

const CartPage = () => {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get("/cart");
        setCart(res.data);
      } catch (err) {
        console.error("Failed to fetch cart", err);
      }
    };

    fetchCart();
  }, []);

  if (!cart) return <p>Loading cart...</p>;

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cart.products.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="cart-products-list">
          {cart.products.map((item, index) => (
            <li key={index} className="cart-product-item">
              <img src={item.product.imageUrl} alt={item.product.name} />
              <div>
                <h2>{item.product.name}</h2>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ${item.product.price}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
      <h3>Total: ${cart.totalAmount.toFixed(2)}</h3>
    </div>
  );
};

export default CartPage;
