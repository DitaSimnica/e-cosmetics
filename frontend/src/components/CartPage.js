import React, { useEffect, useState } from "react";
import axios from "../utils/api";
import "./CartPage.css";
import { toast } from "react-toastify";

const CartPage = () => {
  const [cart, setCart] = useState(null);

  const fetchCart = async () => {
    try {
      const res = await axios.get("/cart");
      setCart(res.data);
    } catch (err) {
      console.error("Failed to fetch cart", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleRemoveFromCart = async (productId) => {
    try {
      await axios.delete(`/cart/remove/${productId}`);
      toast.success("Product removed!");
      fetchCart(); // Refresh cart
    } catch (err) {
      toast.error("Failed to remove product.");
    }
  };

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
              <div className="cart-product-info">
                <h2>{item.product.name}</h2>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ${item.product.price}</p>
              </div>
              <button
                className="remove-btn"
                onClick={() => handleRemoveFromCart(item.product.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      <h3>Total: ${cart.totalAmount.toFixed(2)}</h3>
    </div>
  );
};

export default CartPage;
