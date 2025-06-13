import React, { useEffect, useState } from "react";
import axios from "../utils/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion, useAnimation } from "framer-motion";
import { FaShoppingCart, FaHeart, FaRegHeart, FaArrowUp } from "react-icons/fa";
import "./ProductsPage.css";

const ProductsPage = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState(() => {
    const storedFavs = localStorage.getItem("favorites");
    return storedFavs ? JSON.parse(storedFavs) : [];
  });

  // For sparkles animation on cart icon
  const [showSparkles, setShowSparkles] = useState(false);
  const cartControls = useAnimation();

  // New states for search and sorting
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("default");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/product");
        setProducts(res.data);
      } catch (error) {
        toast.error("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const toggleFavorite = (productId) => {
    setFavorites((prev) => {
      let updatedFavs;
      if (prev.includes(productId)) {
        updatedFavs = prev.filter((id) => id !== productId);
        toast.info("Removed from favorites");
      } else {
        updatedFavs = [...prev, productId];
        toast.success("Added to favorites");
      }
      localStorage.setItem("favorites", JSON.stringify(updatedFavs));
      return updatedFavs;
    });
  };

  const addToCart = async (productId) => {
    try {
      await axios.post("/cart/add", { productId, quantity: 1 });
      toast.success("Added to cart!");
      setShowSparkles(true);
      cartControls.start({
        scale: [1, 1.3, 1],
        rotate: [0, 15, -15, 0],
        transition: { duration: 0.6 },
      });
      setTimeout(() => setShowSparkles(false), 1000);
    } catch {
      toast.error("Failed to add to cart.");
    }
  };

  // Filter products by search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort filtered products based on sortOrder
  const sortedProducts = [...filteredProducts];
  if (sortOrder === "lowToHigh") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "highToLow") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }
  // else "default" => no sorting, keep original order

  if (loading) return <p className="loading-text">Loading products...</p>;

  return (
    <div className="products-page">
      <div className="products-header">
        <h1 className="products-page__title">Discover Your Favorites</h1>
        <div className="header-icons">
          <motion.div animate={cartControls} className="cart-container">
            <FaShoppingCart
              size={26}
              className="cart-icon"
              onClick={() => navigate("/cart")}
              aria-label="Go to cart"
              style={{ cursor: "pointer" }}
            />
            {showSparkles && (
              <div className="sparkle-wrapper">
                <div className="sparkle sparkle-1" />
                <div className="sparkle sparkle-2" />
                <div className="sparkle sparkle-3" />
              </div>
            )}
          </motion.div>

          <FaHeart
            size={26}
            className="favs-icon"
            onClick={() => navigate("/favorites")}
            aria-label="Go to favorites"
            style={{ cursor: "pointer", marginLeft: "1rem", color: "#e63946" }}
          />
        </div>
      </div>

      {/* SEARCH AND SORT UI */}
      <div className="search-sort-container">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
          aria-label="Search products"
        />

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="sort-select"
          aria-label="Sort products"
        >
          <option value="default">Sort by: Default</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>
      </div>

      <div className="products-grid">
        {sortedProducts.length === 0 ? (
          <p>No products found.</p>
        ) : (
          sortedProducts.map((product) => {
            const isFavorite = favorites.includes(product.id);
            return (
              <motion.div
                key={product.id}
                className="product-card"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 8px 20px rgba(246, 145, 179, 0.6)",
                }}
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="product-image"
                />
                <h2 className="product-name">{product.name}</h2>
                <p className="product-price">${product.price}</p>

                <div className="buttons-row">
                  <button
                    onClick={() => addToCart(product.id)}
                    className="add-to-cart-btn"
                    aria-label={`Add ${product.name} to cart`}
                  >
                    Add to Cart <FaShoppingCart />
                  </button>

                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="favorite-btn"
                    aria-label={
                      isFavorite
                        ? `Remove ${product.name} from favorites`
                        : `Add ${product.name} to favorites`
                    }
                  >
                    {isFavorite ? (
                      <FaHeart color="#e63946" />
                    ) : (
                      <FaRegHeart color="#a1a1a1" />
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      <button
        className="scroll-top-btn"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
      >
        <FaArrowUp size={20} />
      </button>
    </div>
  );
};

export default ProductsPage;
