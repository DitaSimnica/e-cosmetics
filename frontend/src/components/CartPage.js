import React, { useEffect, useState } from "react";
import axios from "../utils/api";
import "./CartPage.css";
import { toast } from "react-toastify";

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/cart");
      setCart(res.data);
    } catch (err) {
      toast.error("Failed to fetch cart.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleRemoveFromCart = async (productId) => {
    try {
      await axios.delete(`/cart/remove/${productId}`);
      toast.success("Product removed!");
      fetchCart();
    } catch (err) {
      toast.error("Failed to remove product.");
    }
  };

  const handleCheckout = async () => {
    try {
      await axios.post("/order");
      toast.success("Order placed successfully!");
      fetchCart();
    } catch (err) {
      toast.error("Failed to place order.");
    }
  };

  if (loading) return <div className="loading">Loading cart...</div>;

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cart?.products.length === 0 ? (
        <div className="empty-cart-message">
          <p>🛒 Your cart is looking lonely...</p>
          <p>Let's fill it with some beauty ✨</p>
        </div>
      ) : (
        <>
          <ul className="cart-products-list">
            {cart.products.map(({ product, quantity }, index) => (
              <li key={index} className="cart-product-item">
                <img src={product.imageUrl} alt={product.name} />
                <div className="cart-product-info">
                  <h2>{product.name}</h2>
                  <p>Quantity: {quantity}</p>
                  <p>Price: ${product.price}</p>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => handleRemoveFromCart(product.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <h3>Total: ${cart.totalAmount.toFixed(2)}</h3>
          <button className="checkout-btn" onClick={handleCheckout}>
            Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default CartPage;
