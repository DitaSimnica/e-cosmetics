import React, { useEffect, useState } from "react";
import axios from "../utils/api";
import { toast } from "react-toastify";
import "./ProductsPage.css";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

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
      console.log("Add to cart clicked", productId); // Check this shows up
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
      <h1 className="products-page__title">Our Lovely Products</h1>
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
