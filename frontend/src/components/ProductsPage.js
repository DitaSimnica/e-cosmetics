import React, { useEffect, useState } from "react";
import axios from "../utils/api";
import { toast } from "react-toastify";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./ProductsPage.css";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/product");
        setProducts(res.data);
      } catch (err) {
        toast.error("Failed to load products");
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    console.log("Add to cart clicked", productId);
    try {
      await axios.post("/cart/add", {
        productId,
        quantity: 1,
      });
      toast.success("Added to cart!");
    } catch (err) {
      toast.error("Could not add to cart");
    }
  };

  return (
    <div className="products-page">
      <div className="products-header">
        <h1 className="products-page__title">Our Lovely Products</h1>
        <FaShoppingCart
          size={26}
          className="cart-icon"
          onClick={() => navigate("/cart")}
          style={{ cursor: "pointer", color: "#e96ca3" }}
        />
      </div>

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
    </div>
  );
};

export default ProductsPage;
