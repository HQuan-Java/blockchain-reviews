import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import {
  CONTRACT_ADDRESS,
  CONTRACT_ABI,
  GANACHE_NETWORK,
} from "../utils/contract";

export function useBlockchain() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [networkError, setNetworkError] = useState(null);

  // ========================
  // CONNECT WALLET
  // ========================

  const connectWallet = useCallback(async () => {
    if (!window.ethereum) {
      alert("Vui lòng cài MetaMask trước!");
      return;
    }

    setIsConnecting(true);
    setNetworkError(null);

    try {
      await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: GANACHE_NETWORK.chainId }],
        });
      } catch (switchError) {
        if (switchError.code === 4902) {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [GANACHE_NETWORK],
          });
        }
      }

      const web3Provider = new ethers.BrowserProvider(window.ethereum);
      const web3Signer = await web3Provider.getSigner();
      const contractInstance = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        web3Signer,
      );

      const ownerAddress = await contractInstance.owner();
      const currentAccount = await web3Signer.getAddress();

      setProvider(web3Provider);
      setSigner(web3Signer);
      setContract(contractInstance);
      setAccount(currentAccount);
      setIsOwner(ownerAddress.toLowerCase() === currentAccount.toLowerCase());
    } catch (err) {
      console.error("Lỗi kết nối:", err);
      setNetworkError(err.message);
    } finally {
      setIsConnecting(false);
    }
  }, []);

  // ========================
  // AUTO RECONNECT
  // ========================

  useEffect(() => {
    if (!window.ethereum) return;

    window.ethereum.request({ method: "eth_accounts" }).then((accounts) => {
      if (accounts.length > 0) {
        connectWallet();
      }
    });
  }, [connectWallet]);

  // ========================
  // LISTEN ACCOUNT CHANGE
  // ========================

  useEffect(() => {
    if (!window.ethereum) return;

    const handleAccountsChanged = (accounts) => {
      if (accounts.length === 0) {
        setAccount(null);
        setContract(null);
        setSigner(null);
        setIsOwner(false);
      } else {
        window.location.reload();
      }
    };

    const handleChainChanged = () => {
      window.location.reload();
    };

    window.ethereum.on("accountsChanged", handleAccountsChanged);
    window.ethereum.on("chainChanged", handleChainChanged);

    return () => {
      window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
      window.ethereum.removeListener("chainChanged", handleChainChanged);
    };
  }, []);

  // ========================
  // GET ALL PRODUCTS
  // ========================

  const getAllProducts = useCallback(async () => {
    if (!contract) return [];

    try {
      const products = await contract.getAllProducts();

      return products.map((p) => ({
        productId: Number(p.productId),
        name: p.name,
        description: p.description,
        imageUrl: p.imageUrl,
        price: ethers.formatEther(p.price),
        addedBy: p.addedBy,
        createdAt: Number(p.createdAt),
      }));
    } catch (err) {
      console.error("Lỗi lấy sản phẩm:", err);
      return [];
    }
  }, [contract]);

  // ========================
  // ADD PRODUCT
  // ========================

  const addProduct = useCallback(
    async (name, description, imageUrl, price) => {
      if (!contract) throw new Error("Chưa kết nối contract!");

      const tx = await contract.addProduct(
        name,
        description,
        imageUrl,
        ethers.parseEther(price.toString()),
      );

      return await tx.wait();
    },
    [contract],
  );

  // ========================
  // BUY PRODUCT
  // ========================

  const buyProduct = useCallback(
    async (productId, price) => {
      if (!contract) throw new Error("Chưa kết nối contract!");

      const tx = await contract.buyProduct(productId, {
        value: ethers.parseEther(price.toString()),
      });

      return await tx.wait();
    },
    [contract],
  );

  // ========================
  // ADD REVIEW
  // ========================

  const addReview = useCallback(
    async (productId, stars, content) => {
      if (!contract) throw new Error("Chưa kết nối contract!");

      const tx = await contract.addReview(productId, stars, content);

      return await tx.wait();
    },
    [contract],
  );

  // ========================
  // GET REVIEWS
  // ========================

  const getReviews = useCallback(
    async (productId) => {
      if (!contract) return [];

      try {
        const reviews = await contract.getReviewsByProduct(productId);

        return reviews.map((r) => ({
          reviewId: Number(r.reviewId),
          productId: Number(r.productId),
          reviewer: r.reviewer,
          stars: Number(r.stars),
          content: r.content,
          timestamp: Number(r.timestamp),
        }));
      } catch (err) {
        console.error("Lỗi lấy reviews:", err);
        return [];
      }
    },
    [contract],
  );

  // ========================
  // GET AVERAGE RATING
  // ========================

  const getAverageRating = useCallback(
    async (productId) => {
      if (!contract) return { avg: 0, total: 0 };

      try {
        const [avg, total] = await contract.getAverageRating(productId);

        return {
          avg: Number(avg) / 10,
          total: Number(total),
        };
      } catch {
        return { avg: 0, total: 0 };
      }
    },
    [contract],
  );

  // ========================
  // CHECK REVIEWED
  // ========================

  const checkHasReviewed = useCallback(
    async (productId) => {
      if (!contract || !account) return false;

      try {
        return await contract.checkHasReviewed(productId, account);
      } catch {
        return false;
      }
    },
    [contract, account],
  );

  // ========================
  // CHECK PURCHASED
  // ========================

  const checkHasPurchased = useCallback(
    async (productId) => {
      if (!contract || !account) return false;

      try {
        return await contract.checkHasPurchased(productId, account);
      } catch {
        return false;
      }
    },
    [contract, account],
  );

  // ========================
  // EXPORT
  // ========================

  return {
    account,
    isOwner,
    isConnecting,
    networkError,
    connectWallet,
    getAllProducts,
    addProduct,
    buyProduct,
    addReview,
    getReviews,
    getAverageRating,
    checkHasReviewed,
    checkHasPurchased,
    isConnected: !!account,
  };
}
