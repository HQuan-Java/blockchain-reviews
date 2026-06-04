import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBlockchain } from "./hooks/useBlockchain";
import AdminDashboard from "./components/AdminDashboard";
import UserStorefront from "./components/UserStorefront";
import ReviewModal from "./components/ReviewModal";
import ParticleField from "./components/ParticleField";

export default function App() {
  const {
    account,
    isOwner,
    isConnecting,
    networkError,
    connectWallet,
    getAllProducts,
    addProduct,
    addReview,
    buyProduct,
    getReviews,
    getAverageRating,
    checkHasReviewed,
    checkHasPurchased,
    isConnected,
  } = useBlockchain();

  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const loadProducts = useCallback(async () => {
    if (!isConnected) return;
    setLoadingProducts(true);
    try {
      const data = await getAllProducts();
      setProducts(data);
    } finally {
      setLoadingProducts(false);
    }
  }, [isConnected, getAllProducts]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const sharedProps = {
    account,
    isOwner,
    isConnecting,
    networkError,
    connectWallet,
    isConnected,
    products,
    loadingProducts,
    loadProducts,
    addProduct,
    buyProduct,
    getAverageRating,
    onOpenReview: setSelectedProduct,
  };

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{ background: "#05070f" }}
    >
      <ParticleField density={50} />

      <AnimatePresence mode="wait">
        {isConnected && isOwner ? (
          <AdminDashboard key="admin" {...sharedProps} />
        ) : (
          <UserStorefront key="user" {...sharedProps} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedProduct && (
          <ReviewModal
            product={selectedProduct}
            account={account}
            isOwner={isOwner}
            onClose={() => setSelectedProduct(null)}
            addReview={addReview}
            getReviews={getReviews}
            getAverageRating={getAverageRating}
            checkHasReviewed={checkHasReviewed}
            checkHasPurchased={checkHasPurchased}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
