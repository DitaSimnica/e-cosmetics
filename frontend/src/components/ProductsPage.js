import React, { useEffect, useState } from "react";
import axios from "../utils/api";
import { toast } from "react-toastify";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import "./ProductsPage.css";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [showSparkles, setShowSparkles] = useState(false);
  const navigate = useNavigate();
  const cartControls = useAnimation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/product");
        setProducts(res.data);
      } catch (err) {
        toast.error("Oops! Failed to load products 🥺");
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    try {
      await axios.post("/cart/add", { productId, quantity: 1 });
      toast.success("Added to cart 🛒✨");

      // Trigger cart shake
      await cartControls.start({
        rotate: [0, -15, 15, -10, 10, 0],
        transition: { duration: 0.6 },
      });

      // Trigger sparkles
      setShowSparkles(true);
      setTimeout(() => setShowSparkles(false), 1000);
    } catch {
      toast.error("Could not add to cart 💔");
    }
  };

  return (
    <div className="products-page">
      <div className="products-header">
        <h1 className="products-page__title">Our Lovely Products</h1>
        <motion.div animate={cartControls} className="cart-container">
          <FaShoppingCart
            size={26}
            className="cart-icon"
            onClick={() => navigate("/cart")}
          />
          {showSparkles && (
            <div className="sparkle-wrapper">
              <div className="sparkle sparkle-1" />
              <div className="sparkle sparkle-2" />
              <div className="sparkle sparkle-3" />
            </div>
          )}
        </motion.div>
      </div>

      {products.length === 0 ? (
        <p className="no-products-text">No products available at the moment 🥲</p>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="product-image"
              />
              <h2 className="product-name">{product.name}</h2>
              <p className="product-description">{product.description}</p>
              <p className="product-price">${product.price}</p>
              <button
                onClick={() => handleAddToCart(product.id)}
                className="add-to-cart-btn"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
