import React, { useEffect, useState } from "react";
import axios from "../utils/api";
import { toast } from "react-toastify";
import { FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import "./FavoritesPage.css";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState(() => {
    // Retrieve favorites from localStorage or empty array
    const storedFavs = localStorage.getItem("favorites");
    return storedFavs ? JSON.parse(storedFavs) : [];
  });
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all products first and filter by favorites
    const fetchFavoriteProducts = async () => {
      try {
        const res = await axios.get("/product");
        const allProducts = res.data;
        const favProducts = allProducts.filter((p) =>
          favorites.includes(p.id)
        );
        setFavoriteProducts(favProducts);
      } catch {
        toast.error("Failed to load favorite products.");
      } finally {
        setLoading(false);
      }
    };

    if (favorites.length > 0) {
      fetchFavoriteProducts();
    } else {
      setFavoriteProducts([]);
      setLoading(false);
    }
  }, [favorites]);

  const removeFromFavorites = (productId) => {
    const updatedFavs = favorites.filter((id) => id !== productId);
    setFavorites(updatedFavs);
    localStorage.setItem("favorites", JSON.stringify(updatedFavs));
    toast.info("Removed from favorites");
  };

  if (loading) return <p className="loading-text">Loading favorite products...</p>;

  if (favoriteProducts.length === 0)
    return <p className="empty-text">No favorite products yet! 💖</p>;

  return (
    <div className="favorites-page">
      <h1 className="favorites-title">Your Favorite Products</h1>

      <div className="favorites-grid">
        {favoriteProducts.map((product) => (
          <motion.div
            key={product.id}
            className="favorite-card"
            whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(246, 145, 179, 0.6)" }}
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="favorite-image"
            />
            <h2 className="favorite-name">{product.name}</h2>
            <p className="favorite-price">${product.price}</p>

            <button
              onClick={() => removeFromFavorites(product.id)}
              className="remove-fav-btn"
              aria-label={`Remove ${product.name} from favorites`}
            >
              Remove from Favorites <FaHeart color="#e63946" />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
