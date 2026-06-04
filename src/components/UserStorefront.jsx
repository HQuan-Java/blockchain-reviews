import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { StarDisplay } from "./StarRating";

/* ── NAVBAR ── */
function StorefrontNav({ account, isConnecting, connectWallet }) {
  const shortAddr = account
    ? `${account.slice(0, 6)}...${account.slice(-4)}`
    : null;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: scrolled ? "rgba(5,7,15,0.92)" : "rgba(5,7,15,0.6)",
        backdropFilter: "blur(24px)",
        borderBottom: scrolled
          ? "1px solid rgba(56,189,248,0.12)"
          : "1px solid rgba(255,255,255,0.04)",
        transition: "all 0.3s ease",
      }}
    >
      {/* scan line */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 1,
          overflow: "hidden",
        }}
      >
        <motion.div
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          style={{
            width: "40%",
            height: "100%",
            background:
              "linear-gradient(90deg, transparent, rgba(56,189,248,0.7), transparent)",
          }}
        />
      </div>

      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 24px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 11,
              background:
                "linear-gradient(135deg, rgba(56,189,248,0.3), rgba(139,92,246,0.25))",
              border: "1px solid rgba(56,189,248,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 20px rgba(56,189,248,0.25)",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2"
            >
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
          <div>
            <span
              style={{
                fontFamily: "Sora, sans-serif",
                fontWeight: 700,
                fontSize: 16,
                color: "#fff",
              }}
            >
              Chain
              <span
                style={{
                  background: "linear-gradient(90deg, #38bdf8, #8b5cf6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Review
              </span>
            </span>
            <div
              style={{
                fontSize: 9,
                color: "#334155",
                fontFamily: "JetBrains Mono, monospace",
                marginTop: -1,
              }}
            >
              BLOCKCHAIN REVIEWS
            </div>
          </div>
        </div>

        {/* Nav links */}
        <nav style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {["Trang chủ"].map((item, i) => (
            <motion.button
              key={item}
              whileHover={{ color: "#38bdf8" }}
              style={{
                padding: "6px 14px",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 13,
                color: i === 0 ? "#38bdf8" : "#64748b",
                fontFamily: "Sora, sans-serif",
                fontWeight: 500,
                borderBottom:
                  i === 0 ? "1px solid #38bdf8" : "1px solid transparent",
                transition: "all 0.2s",
              }}
            >
              {item}
            </motion.button>
          ))}
        </nav>

        {/* Wallet */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {account ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "7px 14px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 12,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#34d399",
                  boxShadow: "0 0 8px #34d399",
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 12,
                  color: "#7dd3fc",
                }}
              >
                {shortAddr}
              </span>
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={connectWallet}
              disabled={isConnecting}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 18px",
                borderRadius: 12,
                background:
                  "linear-gradient(135deg, #67e8f9, #38bdf8 50%, #818cf8)",
                border: "none",
                cursor: "pointer",
                fontFamily: "Sora, sans-serif",
                fontWeight: 600,
                fontSize: 13,
                color: "#03121b",
                boxShadow: "0 8px 24px -8px rgba(56,189,248,0.6)",
              }}
            >
              🦊 {isConnecting ? "Đang kết nối..." : "Kết nối MetaMask"}
            </motion.button>
          )}
        </div>
      </div>
    </motion.header>
  );
}

/* ── HERO ── */
function HeroSection({ productCount, account, connectWallet }) {
  const features = [
    {
      icon: "🔗",
      title: "On-Chain lưu trữ",
      desc: "Mọi đánh giá được lưu vĩnh viễn trên Ethereum",
    },
    {
      icon: "🛡️",
      title: "Không thể sửa xóa",
      desc: "Dữ liệu bất biến, minh bạch hoàn toàn",
    },
    {
      icon: "✅",
      title: "Xác minh mua hàng",
      desc: "Chỉ người mua thật mới được đánh giá",
    },
    {
      icon: "⚡",
      title: "Tức thì trên chain",
      desc: "Giao dịch được xác nhận ngay lập tức",
    },
  ];

  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "80px 24px 60px",
      }}
    >
      {/* Ambient glows */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "30%",
            transform: "translate(-50%, -50%)",
            width: 600,
            height: 400,
            background:
              "radial-gradient(ellipse, rgba(56,189,248,0.1) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "15%",
            top: "10%",
            width: 300,
            height: 300,
            background:
              "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "10%",
            bottom: "0%",
            width: 400,
            height: 300,
            background:
              "radial-gradient(circle, rgba(34,211,238,0.07) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 64,
            alignItems: "center",
          }}
        >
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 14px",
                borderRadius: 999,
                background: "rgba(56,189,248,0.08)",
                border: "1px solid rgba(56,189,248,0.2)",
                marginBottom: 24,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#38bdf8",
                  boxShadow: "0 0 8px #38bdf8",
                  animation: "pulse 2s infinite",
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  fontSize: 11,
                  color: "#38bdf8",
                  fontFamily: "JetBrains Mono, monospace",
                }}
              >
                Ethereum Blockchain • Ganache Network
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                fontFamily: "Sora, sans-serif",
                fontWeight: 800,
                fontSize: 52,
                lineHeight: 1.05,
                color: "#fff",
                marginBottom: 20,
              }}
            >
              ĐÁNH GIÁ MINH BẠCH{" "}
              <span
                style={{
                  background:
                    "linear-gradient(110deg, #67e8f9, #38bdf8, #a78bfa)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                TRÊN BLOCKCHAIN
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{
                fontSize: 16,
                color: "#94a3b8",
                lineHeight: 1.7,
                marginBottom: 36,
                maxWidth: 480,
              }}
            >
              Mọi đánh giá được lưu trữ vĩnh viễn trên Ethereum blockchain —{" "}
              <span style={{ color: "#cbd5e1" }}>
                không thể sửa đổi, không thể xóa, minh bạch hoàn toàn.
              </span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              style={{
                display: "flex",
                gap: 12,
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              {!account && (
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={connectWallet}
                  style={{
                    padding: "12px 28px",
                    borderRadius: 14,
                    background:
                      "linear-gradient(135deg, #67e8f9, #38bdf8, #818cf8)",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "Sora, sans-serif",
                    fontWeight: 700,
                    fontSize: 15,
                    color: "#03121b",
                    boxShadow: "0 12px 32px -8px rgba(56,189,248,0.65)",
                  }}
                >
                  🦊 Kết nối ví để bắt đầu
                </motion.button>
              )}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 18px",
                  borderRadius: 14,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <span style={{ fontSize: 16 }}>📦</span>
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#fff",
                    fontFamily: "Sora, sans-serif",
                  }}
                >
                  {productCount}
                </span>
                <span style={{ fontSize: 12, color: "#64748b" }}>sản phẩm</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Shield illustration + feature cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.15,
            }}
            style={{ position: "relative" }}
          >
            {/* Central shield */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 32,
              }}
            >
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  width: 140,
                  height: 140,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(56,189,248,0.2) 0%, rgba(139,92,246,0.15) 60%, transparent 100%)",
                  border: "1px solid rgba(56,189,248,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 60px rgba(56,189,248,0.2)",
                  position: "relative",
                }}
              >
                {/* Ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    position: "absolute",
                    inset: -20,
                    borderRadius: "50%",
                    border: "1px dashed rgba(56,189,248,0.2)",
                  }}
                />
                <span style={{ fontSize: 60 }}>🛡️</span>
              </motion.div>
            </div>

            {/* Feature grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
              }}
            >
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  whileHover={{ y: -4, borderColor: "rgba(56,189,248,0.3)" }}
                  style={{
                    padding: "16px",
                    background:
                      "linear-gradient(135deg, rgba(13,18,42,0.9), rgba(7,10,26,0.95))",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 14,
                    transition: "border-color 0.3s",
                  }}
                >
                  <div style={{ fontSize: 20, marginBottom: 8 }}>{f.icon}</div>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#e2e8f0",
                      fontFamily: "Sora, sans-serif",
                      marginBottom: 4,
                    }}
                  >
                    {f.title}
                  </div>
                  <div
                    style={{ fontSize: 10, color: "#475569", lineHeight: 1.5 }}
                  >
                    {f.desc}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ── PRODUCT CARD ── */
function ProductCard({
  product,
  getAverageRating,
  buyProduct,
  isOwner,
  onReview,
}) {
  const [rating, setRating] = useState({ avg: 0, total: 0 });
  const [imgError, setImgError] = useState(false);
  const [buying, setBuying] = useState(false);

  const ref = useRef(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [6, -6]), {
    stiffness: 200,
    damping: 18,
  });
  const ry = useSpring(useTransform(px, [0, 1], [-6, 6]), {
    stiffness: 200,
    damping: 18,
  });

  useEffect(() => {
    let alive = true;
    getAverageRating(product.productId).then((r) => alive && setRating(r));
    return () => {
      alive = false;
    };
  }, [product.productId, getAverageRating]);

  const handleBuy = async () => {
    try {
      setBuying(true);
      await buyProduct(product.productId, product.price);
      alert("🎉 Mua sản phẩm thành công!");
    } catch (err) {
      alert(err?.reason || err?.message || "❌ Mua hàng thất bại!");
    } finally {
      setBuying(false);
    }
  };

  const gradients = [
    "linear-gradient(135deg, #1e3a5f, #1a1a4e)",
    "linear-gradient(135deg, #2d1b5e, #1a1035)",
    "linear-gradient(135deg, #0d3b2e, #0a1a14)",
    "linear-gradient(135deg, #3b1a1a, #1a0a0a)",
    "linear-gradient(135deg, #2a1f0a, #1a1005)",
  ];
  const grad = gradients[product.productId % gradients.length];

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (r) {
          px.set((e.clientX - r.left) / r.width);
          py.set((e.clientY - r.top) / r.height);
        }
      }}
      onMouseLeave={() => {
        px.set(0.5);
        py.set(0.5);
      }}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        rotateX: rx,
        rotateY: ry,
        transformPerspective: 1000,
        borderRadius: 20,
        background:
          "linear-gradient(165deg, rgba(13,18,42,0.92), rgba(7,10,26,0.97))",
        border: "1px solid rgba(255,255,255,0.07)",
        overflow: "hidden",
        boxShadow: "0 24px 60px -20px rgba(0,0,0,0.8)",
        cursor: "pointer",
        position: "relative",
      }}
      className="group"
      whileHover={{
        boxShadow:
          "0 30px 80px -20px rgba(56,189,248,0.2), 0 0 0 1px rgba(56,189,248,0.15)",
      }}
    >
      {/* Animated border on hover */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 20,
          background:
            "linear-gradient(140deg, rgba(56,189,248,0.5), transparent 35%, transparent 65%, rgba(139,92,246,0.4))",
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: 1,
          opacity: 0,
          transition: "opacity 0.4s",
          pointerEvents: "none",
        }}
        className="group-hover-border"
      />

      {/* Image */}
      <div style={{ height: 180, position: "relative", overflow: "hidden" }}>
        {product.imageUrl && !imgError ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            onError={() => setImgError(true)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.7s ease",
            }}
            className="group-hover:scale-110"
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              background: grad,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: 48, opacity: 0.5 }}>📦</span>
          </div>
        )}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(5,7,15,0.9) 0%, transparent 60%)",
          }}
        />
        {/* Badge */}
        <div
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            display: "flex",
            gap: 6,
          }}
        >
          <span
            style={{
              fontSize: 10,
              padding: "3px 8px",
              borderRadius: 6,
              background: "rgba(5,7,15,0.85)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#94a3b8",
              fontFamily: "JetBrains Mono, monospace",
              backdropFilter: "blur(8px)",
            }}
          >
            #{product.productId}
          </span>
        </div>
        {/* On-chain badge */}
        <div style={{ position: "absolute", top: 12, right: 12 }}>
          <span
            style={{
              fontSize: 9,
              padding: "3px 8px",
              borderRadius: 6,
              background: "rgba(52,211,153,0.15)",
              border: "1px solid rgba(52,211,153,0.3)",
              color: "#34d399",
              fontFamily: "JetBrains Mono, monospace",
              backdropFilter: "blur(8px)",
            }}
          >
            ✓ On-chain
          </span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "18px 20px 20px" }}>
        <h3
          style={{
            fontFamily: "Sora, sans-serif",
            fontWeight: 700,
            fontSize: 15,
            color: "#f1f5f9",
            marginBottom: 6,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {product.name}
        </h3>
        <p
          style={{
            fontSize: 12,
            color: "#475569",
            lineHeight: 1.5,
            marginBottom: 14,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {product.description}
        </p>

        {/* Price */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 12,
          }}
        >
          <span
            style={{
              fontSize: 18,
              fontWeight: 800,
              color: "#fbbf24",
              fontFamily: "Sora, sans-serif",
              textShadow: "0 0 20px rgba(251,191,36,0.4)",
            }}
          >
            ◆ {product.price} ETH
          </span>
        </div>

        {/* Rating */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 14,
            padding: "8px 12px",
            background: "rgba(255,255,255,0.02)",
            borderRadius: 10,
            border: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <StarDisplay rating={rating.avg} size="sm" />
            <span
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#fff",
                fontFamily: "Sora, sans-serif",
              }}
            >
              {rating.avg > 0 ? rating.avg.toFixed(1) : "—"}
            </span>
          </div>
          <span
            style={{
              fontSize: 10,
              color: "#475569",
              fontFamily: "JetBrains Mono, monospace",
            }}
          >
            {rating.total} đánh giá
          </span>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: 8 }}>
          {!isOwner && (
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleBuy}
              disabled={buying}
              style={{
                flex: 1,
                padding: "9px",
                borderRadius: 11,
                background:
                  "linear-gradient(135deg, #6ee7b7, #34d399, #10b981)",
                border: "none",
                cursor: buying ? "not-allowed" : "pointer",
                fontFamily: "Sora, sans-serif",
                fontWeight: 600,
                fontSize: 12,
                color: "#022c22",
                opacity: buying ? 0.6 : 1,
                boxShadow: "0 6px 20px -6px rgba(52,211,153,0.5)",
              }}
            >
              {buying ? "..." : "🛒 Mua hàng"}
            </motion.button>
          )}
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onReview(product)}
            style={{
              flex: 1,
              padding: "9px",
              borderRadius: 11,
              background: "linear-gradient(135deg, #67e8f9, #38bdf8, #818cf8)",
              border: "none",
              cursor: "pointer",
              fontFamily: "Sora, sans-serif",
              fontWeight: 600,
              fontSize: 12,
              color: "#03121b",
              boxShadow: "0 6px 20px -6px rgba(56,189,248,0.5)",
            }}
          >
            ⭐ Đánh giá
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

/* ── CONNECT SCREEN ── */
function ConnectScreen({ connectWallet, isConnecting, networkError }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 24px",
        textAlign: "center",
        minHeight: "50vh",
      }}
    >
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ fontSize: 72, marginBottom: 24 }}
      >
        🦊
      </motion.div>
      <h2
        style={{
          fontFamily: "Sora, sans-serif",
          fontWeight: 800,
          fontSize: 28,
          color: "#fff",
          marginBottom: 12,
        }}
      >
        Kết nối ví để bắt đầu
      </h2>
      <p
        style={{
          fontSize: 15,
          color: "#64748b",
          maxWidth: 400,
          lineHeight: 1.6,
          marginBottom: 32,
        }}
      >
        Kết nối MetaMask để xem sản phẩm, mua hàng và gửi đánh giá lên
        blockchain
      </p>
      {networkError && (
        <div
          style={{
            marginBottom: 20,
            padding: "10px 20px",
            background: "rgba(248,113,113,0.08)",
            border: "1px solid rgba(248,113,113,0.25)",
            borderRadius: 12,
            color: "#fca5a5",
            fontSize: 13,
            maxWidth: 400,
          }}
        >
          ⚠️ {networkError}
        </div>
      )}
      <motion.button
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.97 }}
        onClick={connectWallet}
        disabled={isConnecting}
        style={{
          padding: "14px 36px",
          borderRadius: 14,
          background: "linear-gradient(135deg, #67e8f9, #38bdf8, #818cf8)",
          border: "none",
          cursor: isConnecting ? "not-allowed" : "pointer",
          fontFamily: "Sora, sans-serif",
          fontWeight: 700,
          fontSize: 16,
          color: "#03121b",
          opacity: isConnecting ? 0.7 : 1,
          boxShadow: "0 14px 36px -8px rgba(56,189,248,0.65)",
          marginBottom: 32,
        }}
      >
        {isConnecting ? "Đang kết nối..." : "🦊 Kết nối MetaMask"}
      </motion.button>

      {/* Requirements */}
      <div
        style={{
          padding: "20px 28px",
          background: "rgba(8,12,28,0.8)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 16,
          maxWidth: 360,
          textAlign: "left",
        }}
      >
        <div
          style={{
            fontSize: 11,
            color: "#475569",
            fontFamily: "JetBrains Mono, monospace",
            marginBottom: 12,
          }}
        >
          📋 Yêu cầu:
        </div>
        {[
          "MetaMask đã cài đặt",
          "Ganache đang chạy (port 8545)",
          "Smart contract đã deploy",
          "Đã import account Ganache vào MetaMask",
        ].map((req) => (
          <div
            key={req}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "6px 0",
              borderBottom: "1px solid rgba(255,255,255,0.03)",
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "rgba(56,189,248,0.5)",
                flexShrink: 0,
              }}
            />
            <span style={{ fontSize: 12, color: "#94a3b8" }}>{req}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ── MAIN STOREFRONT ── */
export default function UserStorefront({
  account,
  isConnecting,
  connectWallet,
  networkError,
  isConnected,
  products,
  loadingProducts,
  loadProducts,
  buyProduct,
  getAverageRating,
  onOpenReview,
}) {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");

  const filteredProducts = products
    .filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortBy === "price_asc")
        return parseFloat(a.price) - parseFloat(b.price);
      if (sortBy === "price_desc")
        return parseFloat(b.price) - parseFloat(a.price);
      return a.productId - b.productId;
    });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ position: "relative", zIndex: 1 }}
    >
      <StorefrontNav
        account={account}
        isConnecting={isConnecting}
        connectWallet={connectWallet}
      />

      {/* Hero */}
      <HeroSection
        productCount={products.length}
        account={account}
        connectWallet={connectWallet}
      />

      {/* Main content */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px 80px" }}>
        {!isConnected ? (
          <ConnectScreen
            connectWallet={connectWallet}
            isConnecting={isConnecting}
            networkError={networkError}
          />
        ) : (
          <>
            {/* Section header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 28,
              }}
            >
              <div>
                <h2
                  style={{
                    fontFamily: "Sora, sans-serif",
                    fontWeight: 700,
                    fontSize: 22,
                    color: "#fff",
                    margin: 0,
                    marginBottom: 4,
                  }}
                >
                  Sản phẩm nổi bật
                </h2>
                <p style={{ fontSize: 13, color: "#475569", margin: 0 }}>
                  Tất cả đánh giá được xác minh trên blockchain
                </p>
              </div>
              <button
                onClick={loadProducts}
                disabled={loadingProducts}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "8px 16px",
                  borderRadius: 10,
                  background: "rgba(56,189,248,0.06)",
                  border: "1px solid rgba(56,189,248,0.18)",
                  color: "#38bdf8",
                  fontSize: 12,
                  fontFamily: "Sora, sans-serif",
                  cursor: "pointer",
                }}
              >
                <svg
                  className={loadingProducts ? "animate-spin" : ""}
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.66 0 3-4.03 3-9s-1.34-9-3-9m0 18c-1.66 0-3-4.03-3-9s1.34-9 3-9" />
                </svg>
                Làm mới
              </button>
            </div>

            {/* Search + Filter bar */}
            <div
              style={{
                display: "flex",
                gap: 12,
                marginBottom: 28,
                flexWrap: "wrap",
              }}
            >
              <div style={{ flex: 1, minWidth: 240, position: "relative" }}>
                <svg
                  style={{
                    position: "absolute",
                    left: 14,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#475569",
                  }}
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Tìm kiếm sản phẩm..."
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    background: "rgba(8,11,31,0.7)",
                    border: "1px solid rgba(255,255,255,0.09)",
                    borderRadius: 12,
                    padding: "10px 14px 10px 40px",
                    color: "#e2e8f0",
                    fontSize: 13,
                    fontFamily: "Outfit, sans-serif",
                    outline: "none",
                  }}
                />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  padding: "10px 16px",
                  borderRadius: 12,
                  background: "rgba(8,11,31,0.7)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  color: "#94a3b8",
                  fontSize: 13,
                  fontFamily: "Sora, sans-serif",
                  cursor: "pointer",
                  outline: "none",
                }}
              >
                <option value="default">Tất cả danh mục</option>
                <option value="price_asc">Giá tăng dần</option>
                <option value="price_desc">Giá giảm dần</option>
              </select>
              {search && (
                <button
                  onClick={() => setSearch("")}
                  style={{
                    padding: "10px 16px",
                    borderRadius: 12,
                    background: "rgba(248,113,113,0.08)",
                    border: "1px solid rgba(248,113,113,0.2)",
                    color: "#fca5a5",
                    fontSize: 12,
                    cursor: "pointer",
                    fontFamily: "Sora, sans-serif",
                  }}
                >
                  ✕ Xóa tìm kiếm
                </button>
              )}
            </div>

            {/* Count */}
            {filteredProducts.length > 0 && (
              <div
                style={{
                  fontSize: 12,
                  color: "#475569",
                  marginBottom: 20,
                  fontFamily: "JetBrains Mono, monospace",
                }}
              >
                {filteredProducts.length} sản phẩm{" "}
                {search ? `cho "${search}"` : ""}
              </div>
            )}

            {/* Product grid */}
            {loadingProducts ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                  gap: 20,
                }}
              >
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="shimmer"
                    style={{ height: 360, borderRadius: 20 }}
                  />
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div style={{ textAlign: "center", padding: "80px 0" }}>
                <div style={{ fontSize: 52, marginBottom: 16 }}>
                  {search ? "🔍" : "📦"}
                </div>
                <h3
                  style={{
                    fontFamily: "Sora, sans-serif",
                    fontSize: 20,
                    fontWeight: 700,
                    color: "#fff",
                    marginBottom: 8,
                  }}
                >
                  {search ? "Không tìm thấy sản phẩm" : "Chưa có sản phẩm nào"}
                </h3>
                <p style={{ fontSize: 13, color: "#475569" }}>
                  {search ? "Thử từ khóa khác" : "Admin chưa thêm sản phẩm nào"}
                </p>
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                  gap: 20,
                }}
              >
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.productId}
                    product={product}
                    getAverageRating={getAverageRating}
                    buyProduct={buyProduct}
                    isOwner={false}
                    onReview={onOpenReview}
                  />
                ))}
              </div>
            )}

            {/* Bottom trust badges */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: 16,
                marginTop: 64,
                padding: "32px 0",
                borderTop: "1px solid rgba(255,255,255,0.04)",
              }}
            >
              {[
                {
                  icon: "🔗",
                  title: "Minh bạch",
                  desc: "Mọi đánh giá đều công khai và có thể xác minh",
                },
                {
                  icon: "🛡️",
                  title: "Bảo mật",
                  desc: "Dữ liệu được lưu trữ trên Blockchain, không thể sửa đổi",
                },
                {
                  icon: "⚖️",
                  title: "Công bằng",
                  desc: "Ngăn chặn đánh giá ảo, bảo vệ người dùng",
                },
                {
                  icon: "⚡",
                  title: "Phi tập trung",
                  desc: "Hệ thống hoạt động trên nền tảng Blockchain",
                },
              ].map(({ icon, title, desc }) => (
                <motion.div
                  key={title}
                  whileHover={{ y: -4 }}
                  style={{
                    padding: "20px 24px",
                    background: "rgba(8,12,28,0.6)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    borderRadius: 16,
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: 28, marginBottom: 10 }}>{icon}</div>
                  <div
                    style={{
                      fontFamily: "Sora, sans-serif",
                      fontWeight: 600,
                      fontSize: 14,
                      color: "#e2e8f0",
                      marginBottom: 6,
                    }}
                  >
                    {title}
                  </div>
                  <div
                    style={{ fontSize: 11, color: "#475569", lineHeight: 1.5 }}
                  >
                    {desc}
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid rgba(255,255,255,0.04)",
          padding: "20px 24px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 11,
            color: "#1e293b",
          }}
        >
          ChainReview • Hệ thống đánh giá sản phẩm minh bạch trên Blockchain •{" "}
          <span style={{ color: "#1e293b" }}>Đồ án môn Blockchain 2024</span>
        </p>
      </footer>
    </motion.div>
  );
}
