import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AdminPanel from "./AdminPanel";
import { StarDisplay } from "./StarRating";

const NAV_ITEMS = [
  { id: "overview", icon: "⬡", label: "Tổng quan" },
  { id: "products", icon: "◈", label: "Sản phẩm" },
  { id: "reviews", icon: "✦", label: "Đánh giá" },
  { id: "blockchain", icon: "⬡", label: "Blockchain" },
];

function StatCard({ label, value, change, icon, accent }) {
  const accents = {
    sky: {
      border: "rgba(56,189,248,0.2)",
      glow: "rgba(56,189,248,0.08)",
      text: "#38bdf8",
      badge: "rgba(56,189,248,0.15)",
    },
    violet: {
      border: "rgba(139,92,246,0.2)",
      glow: "rgba(139,92,246,0.08)",
      text: "#8b5cf6",
      badge: "rgba(139,92,246,0.15)",
    },
    emerald: {
      border: "rgba(52,211,153,0.2)",
      glow: "rgba(52,211,153,0.08)",
      text: "#34d399",
      badge: "rgba(52,211,153,0.15)",
    },
    amber: {
      border: "rgba(251,191,36,0.2)",
      glow: "rgba(251,191,36,0.08)",
      text: "#fbbf24",
      badge: "rgba(251,191,36,0.15)",
    },
  };
  const a = accents[accent] || accents.sky;

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{
        background: `linear-gradient(135deg, rgba(13,18,42,0.9), rgba(7,10,26,0.95))`,
        border: `1px solid ${a.border}`,
        borderRadius: 16,
        padding: "20px 24px",
        boxShadow: `0 0 40px -10px ${a.glow}, inset 0 1px 0 rgba(255,255,255,0.04)`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -20,
          right: -20,
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: a.glow,
          filter: "blur(20px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: 12,
        }}
      >
        <div
          style={{
            fontSize: 11,
            color: "#64748b",
            fontFamily: "JetBrains Mono, monospace",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          {label}
        </div>
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 10,
            background: a.badge,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
          }}
        >
          {icon}
        </div>
      </div>
      <div
        style={{
          fontSize: 30,
          fontWeight: 800,
          color: "#fff",
          fontFamily: "Sora, sans-serif",
          lineHeight: 1,
          marginBottom: 8,
        }}
      >
        {value}
      </div>
      {change && (
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span
            style={{
              fontSize: 10,
              color: "#34d399",
              background: "rgba(52,211,153,0.1)",
              padding: "2px 7px",
              borderRadius: 20,
              fontFamily: "JetBrains Mono, monospace",
            }}
          >
            ↑ {change}
          </span>
        </div>
      )}
    </motion.div>
  );
}

function BlockchainNetworkViz() {
  return (
    <div
      style={{
        position: "relative",
        height: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Center node */}
      <div
        style={{
          position: "absolute",
          width: 52,
          height: 52,
          borderRadius: "50%",
          background:
            "linear-gradient(135deg, rgba(56,189,248,0.3), rgba(139,92,246,0.3))",
          border: "2px solid rgba(56,189,248,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 30px rgba(56,189,248,0.4)",
          zIndex: 2,
        }}
      >
        <span style={{ fontSize: 22 }}>⬡</span>
      </div>
      {/* Orbiting nodes */}
      {[0, 60, 120, 180, 240, 300].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const r = 80;
        const x = Math.cos(rad) * r;
        const y = Math.sin(rad) * r;
        const colors = [
          "#38bdf8",
          "#8b5cf6",
          "#34d399",
          "#fbbf24",
          "#f472b6",
          "#38bdf8",
        ];
        return (
          <motion.div
            key={i}
            animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
            transition={{
              duration: 2 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.4,
            }}
            style={{
              position: "absolute",
              width: 24,
              height: 24,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${colors[i]}40, transparent)`,
              border: `1px solid ${colors[i]}60`,
              transform: `translate(${x}px, ${y}px)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 2,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: colors[i],
              }}
            />
          </motion.div>
        );
      })}
      {/* SVG lines */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        {[0, 60, 120, 180, 240, 300].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          const r = 80;
          const cx = "50%";
          const cy = "50%";
          const ex = `calc(50% + ${Math.cos(rad) * r}px)`;
          const ey = `calc(50% + ${Math.sin(rad) * r}px)`;
          return (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={ex}
              y2={ey}
              stroke="rgba(56,189,248,0.2)"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
          );
        })}
      </svg>
    </div>
  );
}

function RatingDistribution({ reviews }) {
  const counts = [5, 4, 3, 2, 1].map((s) => ({
    star: s,
    count: reviews.filter((r) => r.stars === s).length,
  }));
  const total = reviews.length;
  const colors = {
    5: "#fbbf24",
    4: "#34d399",
    3: "#38bdf8",
    2: "#8b5cf6",
    1: "#f87171",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {counts.map(({ star, count }) => {
        const pct = total > 0 ? (count / total) * 100 : 0;
        return (
          <div
            key={star}
            style={{ display: "flex", alignItems: "center", gap: 10 }}
          >
            <span
              style={{
                width: 14,
                fontSize: 11,
                color: "#64748b",
                fontFamily: "JetBrains Mono, monospace",
              }}
            >
              {star}★
            </span>
            <div
              style={{
                flex: 1,
                height: 6,
                borderRadius: 999,
                background: "rgba(255,255,255,0.05)",
                overflow: "hidden",
              }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 1, ease: "easeOut", delay: star * 0.1 }}
                style={{
                  height: "100%",
                  borderRadius: 999,
                  background: colors[star],
                  boxShadow: `0 0 8px ${colors[star]}60`,
                }}
              />
            </div>
            <span
              style={{
                width: 24,
                fontSize: 11,
                color: "#475569",
                fontFamily: "JetBrains Mono, monospace",
                textAlign: "right",
              }}
            >
              {count}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default function AdminDashboard({
  account,
  isOwner,
  isConnecting,
  connectWallet,
  products,
  loadingProducts,
  loadProducts,
  addProduct,
  buyProduct,
  getAverageRating,
  onOpenReview,
}) {
  const [activeTab, setActiveTab] = useState("overview");
  const [allReviews, setAllReviews] = useState([]);
  const [ratings, setRatings] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const shortAddr = account
    ? `${account.slice(0, 6)}...${account.slice(-4)}`
    : "";

  // Load ratings for stats
  useEffect(() => {
    if (!products.length) return;
    products.forEach(async (p) => {
      if (getAverageRating) {
        const r = await getAverageRating(p.productId);
        setRatings((prev) => ({ ...prev, [p.productId]: r }));
      }
    });
  }, [products, getAverageRating]);

  const totalReviews = Object.values(ratings).reduce((s, r) => s + r.total, 0);
  const avgRatingAll = (() => {
    const vals = Object.values(ratings).filter((r) => r.total > 0);
    if (!vals.length) return 0;
    const weighted = vals.reduce((s, r) => s + r.avg * r.total, 0);
    const total = vals.reduce((s, r) => s + r.total, 0);
    return total > 0 ? (weighted / total).toFixed(1) : 0;
  })();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        display: "flex",
        minHeight: "100vh",
        position: "relative",
        zIndex: 1,
      }}
    >
      {/* ── SIDEBAR ── */}
      <motion.aside
        animate={{ width: sidebarOpen ? 240 : 72 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{
          background:
            "linear-gradient(180deg, rgba(8,12,28,0.97) 0%, rgba(5,7,15,0.98) 100%)",
          borderRight: "1px solid rgba(56,189,248,0.1)",
          flexShrink: 0,
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          zIndex: 50,
        }}
      >
        {/* Logo */}
        <div
          style={{
            padding: "24px 20px 20px",
            borderBottom: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 38,
                height: 38,
                flexShrink: 0,
                borderRadius: 12,
                background:
                  "linear-gradient(135deg, rgba(56,189,248,0.3), rgba(139,92,246,0.25))",
                border: "1px solid rgba(56,189,248,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 20px rgba(56,189,248,0.3)",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="2"
              >
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <div
                  style={{
                    fontFamily: "Sora, sans-serif",
                    fontWeight: 700,
                    fontSize: 15,
                    color: "#fff",
                    lineHeight: 1,
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
                </div>
                <div
                  style={{
                    fontSize: 9,
                    color: "#334155",
                    fontFamily: "JetBrains Mono, monospace",
                    marginTop: 2,
                  }}
                >
                  ADMIN DASHBOARD
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Admin badge */}
        {sidebarOpen && (
          <div
            style={{
              margin: "16px 16px 8px",
              padding: "12px 14px",
              background: "rgba(251,191,36,0.07)",
              border: "1px solid rgba(251,191,36,0.2)",
              borderRadius: 12,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 10,
                  background: "rgba(251,191,36,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                }}
              >
                👑
              </div>
              <div>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#fbbf24",
                    fontFamily: "Sora, sans-serif",
                  }}
                >
                  Super Admin
                </div>
                <div
                  style={{
                    fontSize: 9,
                    color: "#64748b",
                    fontFamily: "JetBrains Mono, monospace",
                  }}
                >
                  {shortAddr}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Nav */}
        <nav
          style={{
            flex: 1,
            padding: "8px 12px",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {NAV_ITEMS.map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ x: 3 }}
              onClick={() => setActiveTab(item.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: sidebarOpen ? "10px 14px" : "10px",
                justifyContent: sidebarOpen ? "flex-start" : "center",
                borderRadius: 12,
                border: "none",
                cursor: "pointer",
                background:
                  activeTab === item.id
                    ? "linear-gradient(135deg, rgba(56,189,248,0.15), rgba(139,92,246,0.1))"
                    : "transparent",
                borderLeft:
                  activeTab === item.id
                    ? "2px solid #38bdf8"
                    : "2px solid transparent",
                transition: "all 0.2s",
              }}
            >
              <span
                style={{
                  fontSize: 16,
                  color: activeTab === item.id ? "#38bdf8" : "#475569",
                }}
              >
                {item.icon}
              </span>
              {sidebarOpen && (
                <span
                  style={{
                    fontSize: 13,
                    fontFamily: "Sora, sans-serif",
                    fontWeight: activeTab === item.id ? 600 : 400,
                    color: activeTab === item.id ? "#e2e8f0" : "#475569",
                  }}
                >
                  {item.label}
                </span>
              )}
            </motion.button>
          ))}
        </nav>

        {/* Network status */}
        {sidebarOpen && (
          <div
            style={{
              padding: "16px 16px 20px",
              borderTop: "1px solid rgba(255,255,255,0.04)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 12px",
                background: "rgba(52,211,153,0.05)",
                border: "1px solid rgba(52,211,153,0.15)",
                borderRadius: 10,
              }}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span
                style={{
                  fontSize: 10,
                  color: "#34d399",
                  fontFamily: "JetBrains Mono, monospace",
                }}
              >
                Ganache Local
              </span>
            </div>
          </div>
        )}

        {/* Collapse toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{
            position: "absolute",
            bottom: 70,
            right: -12,
            width: 24,
            height: 24,
            borderRadius: "50%",
            background: "rgba(56,189,248,0.2)",
            border: "1px solid rgba(56,189,248,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: 10,
            color: "#38bdf8",
          }}
        >
          {sidebarOpen ? "◀" : "▶"}
        </button>
      </motion.aside>

      {/* ── MAIN CONTENT ── */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}
      >
        {/* Top bar */}
        <header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 40,
            background: "rgba(5,7,15,0.85)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            padding: "0 32px",
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h1
              style={{
                fontFamily: "Sora, sans-serif",
                fontSize: 18,
                fontWeight: 700,
                color: "#fff",
                margin: 0,
              }}
            >
              {NAV_ITEMS.find((n) => n.id === activeTab)?.label}
            </h1>
            <p
              style={{
                fontSize: 11,
                color: "#475569",
                fontFamily: "JetBrains Mono, monospace",
                margin: 0,
              }}
            >
              ChainReview • Blockchain Product Reviews
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              onClick={loadProducts}
              disabled={loadingProducts}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "7px 14px",
                borderRadius: 10,
                background: "rgba(56,189,248,0.08)",
                border: "1px solid rgba(56,189,248,0.2)",
                color: "#38bdf8",
                fontSize: 12,
                fontFamily: "Sora, sans-serif",
                cursor: "pointer",
              }}
            >
              <svg
                className={loadingProducts ? "animate-spin" : ""}
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.66 0 3-4.03 3-9s-1.34-9-3-9m0 18c-1.66 0-3-4.03-3-9s1.34-9 3-9" />
              </svg>
              Làm mới
            </button>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "7px 14px",
                borderRadius: 10,
                background: "rgba(251,191,36,0.08)",
                border: "1px solid rgba(251,191,36,0.2)",
              }}
            >
              <span style={{ fontSize: 14 }}>👑</span>
              <span
                style={{
                  fontSize: 12,
                  color: "#fbbf24",
                  fontFamily: "JetBrains Mono, monospace",
                }}
              >
                {shortAddr}
              </span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, padding: "28px 32px", overflowY: "auto" }}>
          <AnimatePresence mode="wait">
            {/* ── OVERVIEW TAB ── */}
            {activeTab === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
              >
                {/* Stats row */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: 16,
                    marginBottom: 28,
                  }}
                >
                  <StatCard
                    label="Tổng sản phẩm"
                    value={products.length}
                    change="trên blockchain"
                    icon="📦"
                    accent="sky"
                  />
                  <StatCard
                    label="Tổng đánh giá"
                    value={totalReviews}
                    change="đã xác minh"
                    icon="✦"
                    accent="violet"
                  />
                  <StatCard
                    label="Điểm TB"
                    value={avgRatingAll > 0 ? `${avgRatingAll}★` : "—"}
                    icon="⭐"
                    accent="amber"
                  />
                  <StatCard
                    label="Trạng thái"
                    value="Ổn định"
                    change="Ganache Live"
                    icon="⬡"
                    accent="emerald"
                  />
                </div>

                {/* Two column */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 20,
                    marginBottom: 28,
                  }}
                >
                  {/* Blockchain Network */}
                  <div
                    style={{
                      background: "rgba(8,12,28,0.9)",
                      border: "1px solid rgba(56,189,248,0.12)",
                      borderRadius: 16,
                      padding: 24,
                    }}
                  >
                    <h3
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#e2e8f0",
                        fontFamily: "Sora, sans-serif",
                        marginBottom: 16,
                      }}
                    >
                      Mạng Blockchain
                    </h3>
                    <BlockchainNetworkViz />
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 12,
                        marginTop: 16,
                      }}
                    >
                      {[
                        { label: "Network", val: "Ganache" },
                        { label: "Chain ID", val: "1337" },
                        { label: "RPC", val: "8545" },
                        { label: "Trạng thái", val: "● Live" },
                      ].map(({ label, val }) => (
                        <div
                          key={label}
                          style={{
                            background: "rgba(255,255,255,0.03)",
                            borderRadius: 8,
                            padding: "8px 12px",
                          }}
                        >
                          <div
                            style={{
                              fontSize: 10,
                              color: "#475569",
                              fontFamily: "JetBrains Mono, monospace",
                            }}
                          >
                            {label}
                          </div>
                          <div
                            style={{
                              fontSize: 12,
                              color: "#38bdf8",
                              fontFamily: "JetBrains Mono, monospace",
                              marginTop: 2,
                            }}
                          >
                            {val}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Rating distribution */}
                  <div
                    style={{
                      background: "rgba(8,12,28,0.9)",
                      border: "1px solid rgba(139,92,246,0.12)",
                      borderRadius: 16,
                      padding: 24,
                    }}
                  >
                    <h3
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#e2e8f0",
                        fontFamily: "Sora, sans-serif",
                        marginBottom: 16,
                      }}
                    >
                      Phân bố đánh giá
                    </h3>
                    {totalReviews > 0 ? (
                      <>
                        <div style={{ textAlign: "center", marginBottom: 20 }}>
                          <div
                            style={{
                              fontSize: 48,
                              fontWeight: 800,
                              color: "#fff",
                              fontFamily: "Sora, sans-serif",
                              lineHeight: 1,
                              textShadow: "0 0 30px rgba(251,191,36,0.4)",
                            }}
                          >
                            {avgRatingAll}
                          </div>
                          <div
                            style={{
                              fontSize: 11,
                              color: "#64748b",
                              marginTop: 4,
                            }}
                          >
                            / 5.0 • {totalReviews} đánh giá
                          </div>
                        </div>
                        <RatingDistribution
                          reviews={Object.values(ratings).flatMap((r) =>
                            Array.from({ length: r.total }, (_, i) => ({
                              stars: Math.round(r.avg),
                            })),
                          )}
                        />
                      </>
                    ) : (
                      <div
                        style={{
                          textAlign: "center",
                          padding: "40px 0",
                          color: "#334155",
                          fontSize: 13,
                        }}
                      >
                        Chưa có đánh giá nào
                      </div>
                    )}
                  </div>
                </div>

                {/* Recent products table */}
                <div
                  style={{
                    background: "rgba(8,12,28,0.9)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 16,
                    padding: 24,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 20,
                    }}
                  >
                    <h3
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#e2e8f0",
                        fontFamily: "Sora, sans-serif",
                      }}
                    >
                      Sản phẩm gần đây
                    </h3>
                    <button
                      onClick={() => setActiveTab("products")}
                      style={{
                        fontSize: 11,
                        color: "#38bdf8",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontFamily: "JetBrains Mono, monospace",
                      }}
                    >
                      Xem tất cả →
                    </button>
                  </div>
                  <ProductTable
                    products={products.slice(0, 5)}
                    ratings={ratings}
                    onReview={onOpenReview}
                  />
                </div>
              </motion.div>
            )}

            {/* ── PRODUCTS TAB ── */}
            {activeTab === "products" && (
              <motion.div
                key="products"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <AdminPanel
                  addProduct={addProduct}
                  onProductAdded={loadProducts}
                />
                <div
                  style={{
                    background: "rgba(8,12,28,0.9)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 16,
                    padding: 24,
                  }}
                >
                  <h3
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "#e2e8f0",
                      fontFamily: "Sora, sans-serif",
                      marginBottom: 20,
                    }}
                  >
                    Danh sách sản phẩm ({products.length})
                  </h3>
                  {loadingProducts ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 8,
                      }}
                    >
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="shimmer"
                          style={{ height: 60, borderRadius: 10 }}
                        />
                      ))}
                    </div>
                  ) : (
                    <ProductTable
                      products={products}
                      ratings={ratings}
                      onReview={onOpenReview}
                    />
                  )}
                </div>
              </motion.div>
            )}

            {/* ── REVIEWS TAB ── */}
            {activeTab === "reviews" && (
              <motion.div
                key="reviews"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: 16,
                    marginBottom: 24,
                  }}
                >
                  <StatCard
                    label="Tổng đánh giá"
                    value={totalReviews}
                    icon="✦"
                    accent="violet"
                  />
                  <StatCard
                    label="Sản phẩm đã review"
                    value={
                      Object.values(ratings).filter((r) => r.total > 0).length
                    }
                    icon="📦"
                    accent="sky"
                  />
                  <StatCard
                    label="Điểm TB toàn hệ thống"
                    value={avgRatingAll > 0 ? `${avgRatingAll}★` : "—"}
                    icon="⭐"
                    accent="amber"
                  />
                </div>
                <div
                  style={{
                    background: "rgba(8,12,28,0.9)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 16,
                    padding: 24,
                  }}
                >
                  <h3
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "#e2e8f0",
                      fontFamily: "Sora, sans-serif",
                      marginBottom: 20,
                    }}
                  >
                    Rating theo sản phẩm
                  </h3>
                  {products.length === 0 ? (
                    <div
                      style={{
                        textAlign: "center",
                        padding: "40px 0",
                        color: "#334155",
                      }}
                    >
                      Chưa có sản phẩm
                    </div>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 10,
                      }}
                    >
                      {products.map((p) => {
                        const r = ratings[p.productId] || { avg: 0, total: 0 };
                        return (
                          <motion.div
                            key={p.productId}
                            whileHover={{ x: 4 }}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 16,
                              padding: "12px 16px",
                              background: "rgba(255,255,255,0.02)",
                              border: "1px solid rgba(255,255,255,0.04)",
                              borderRadius: 12,
                              cursor: "pointer",
                            }}
                            onClick={() => onOpenReview(p)}
                          >
                            <div
                              style={{
                                width: 36,
                                height: 36,
                                borderRadius: 10,
                                background:
                                  "linear-gradient(135deg, rgba(56,189,248,0.2), rgba(139,92,246,0.2))",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 16,
                                flexShrink: 0,
                              }}
                            >
                              📦
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div
                                style={{
                                  fontSize: 13,
                                  fontWeight: 600,
                                  color: "#e2e8f0",
                                  fontFamily: "Sora, sans-serif",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {p.name}
                              </div>
                              <div
                                style={{
                                  fontSize: 10,
                                  color: "#475569",
                                  fontFamily: "JetBrains Mono, monospace",
                                }}
                              >
                                {p.price} ETH
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 6,
                                flexShrink: 0,
                              }}
                            >
                              <StarDisplay rating={r.avg} size="sm" />
                              <span
                                style={{
                                  fontSize: 12,
                                  color: r.avg > 0 ? "#fbbf24" : "#334155",
                                  fontFamily: "JetBrains Mono, monospace",
                                }}
                              >
                                {r.avg > 0 ? r.avg.toFixed(1) : "—"}
                              </span>
                              <span
                                style={{
                                  fontSize: 10,
                                  color: "#475569",
                                  fontFamily: "JetBrains Mono, monospace",
                                }}
                              >
                                ({r.total})
                              </span>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* ── BLOCKCHAIN TAB ── */}
            {activeTab === "blockchain" && (
              <motion.div
                key="blockchain"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 20,
                  }}
                >
                  <div
                    style={{
                      background: "rgba(8,12,28,0.9)",
                      border: "1px solid rgba(56,189,248,0.12)",
                      borderRadius: 16,
                      padding: 24,
                    }}
                  >
                    <h3
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#e2e8f0",
                        fontFamily: "Sora, sans-serif",
                        marginBottom: 16,
                      }}
                    >
                      Thông tin Contract
                    </h3>
                    {[
                      {
                        label: "Contract Address",
                        val: "0xDAfE0C7F...ffC1E815",
                        mono: true,
                      },
                      { label: "Network", val: "Ganache Local" },
                      { label: "Chain ID", val: "1337 (0x539)" },
                      { label: "Solidity", val: "^0.8.19" },
                      { label: "Owner", val: "Bạn (Admin)" },
                    ].map(({ label, val, mono }) => (
                      <div
                        key={label}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "10px 0",
                          borderBottom: "1px solid rgba(255,255,255,0.04)",
                        }}
                      >
                        <span
                          style={{
                            fontSize: 12,
                            color: "#64748b",
                            fontFamily: "JetBrains Mono, monospace",
                          }}
                        >
                          {label}
                        </span>
                        <span
                          style={{
                            fontSize: 12,
                            color: "#38bdf8",
                            fontFamily: mono
                              ? "JetBrains Mono, monospace"
                              : "Sora, sans-serif",
                          }}
                        >
                          {val}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div
                    style={{
                      background: "rgba(8,12,28,0.9)",
                      border: "1px solid rgba(52,211,153,0.12)",
                      borderRadius: 16,
                      padding: 24,
                    }}
                  >
                    <h3
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#e2e8f0",
                        fontFamily: "Sora, sans-serif",
                        marginBottom: 16,
                      }}
                    >
                      Tính năng Smart Contract
                    </h3>
                    {[
                      {
                        fn: "addProduct()",
                        desc: "Thêm sản phẩm mới",
                        tag: "Admin only",
                        color: "#fbbf24",
                      },
                      {
                        fn: "buyProduct()",
                        desc: "Mua sản phẩm bằng ETH",
                        tag: "Payable",
                        color: "#34d399",
                      },
                      {
                        fn: "addReview()",
                        desc: "Đánh giá sau khi mua",
                        tag: "Verified",
                        color: "#38bdf8",
                      },
                      {
                        fn: "getAverageRating()",
                        desc: "Tính điểm trung bình",
                        tag: "View",
                        color: "#8b5cf6",
                      },
                      {
                        fn: "checkHasPurchased()",
                        desc: "Kiểm tra quyền review",
                        tag: "View",
                        color: "#f472b6",
                      },
                    ].map(({ fn, desc, tag, color }) => (
                      <div
                        key={fn}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          padding: "10px 0",
                          borderBottom: "1px solid rgba(255,255,255,0.04)",
                        }}
                      >
                        <div style={{ flex: 1 }}>
                          <div
                            style={{
                              fontSize: 11,
                              color: "#e2e8f0",
                              fontFamily: "JetBrains Mono, monospace",
                            }}
                          >
                            {fn}
                          </div>
                          <div
                            style={{
                              fontSize: 10,
                              color: "#475569",
                              marginTop: 2,
                            }}
                          >
                            {desc}
                          </div>
                        </div>
                        <span
                          style={{
                            fontSize: 9,
                            padding: "2px 7px",
                            borderRadius: 20,
                            background: `${color}20`,
                            color,
                            fontFamily: "JetBrains Mono, monospace",
                          }}
                        >
                          {tag}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </motion.div>
  );
}

function ProductTable({ products, ratings, onReview }) {
  if (products.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "32px 0",
          color: "#334155",
          fontSize: 13,
        }}
      >
        Chưa có sản phẩm nào
      </div>
    );
  }

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            {["#", "Tên sản phẩm", "Giá (ETH)", "Đánh giá", "Điểm TB", ""].map(
              (h) => (
                <th
                  key={h}
                  style={{
                    padding: "8px 12px",
                    textAlign: "left",
                    fontSize: 10,
                    color: "#475569",
                    fontFamily: "JetBrains Mono, monospace",
                    fontWeight: 500,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  {h}
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody>
          {products.map((p, i) => {
            const r = ratings[p.productId] || { avg: 0, total: 0 };
            return (
              <motion.tr
                key={p.productId}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                style={{
                  borderBottom: "1px solid rgba(255,255,255,0.03)",
                  cursor: "pointer",
                }}
                whileHover={{ backgroundColor: "rgba(56,189,248,0.04)" }}
              >
                <td
                  style={{
                    padding: "12px 12px",
                    fontSize: 11,
                    color: "#475569",
                    fontFamily: "JetBrains Mono, monospace",
                  }}
                >
                  #{p.productId}
                </td>
                <td style={{ padding: "12px 12px" }}>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#e2e8f0",
                      fontFamily: "Sora, sans-serif",
                      maxWidth: 200,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {p.name}
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      color: "#334155",
                      maxWidth: 200,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {p.description}
                  </div>
                </td>
                <td style={{ padding: "12px 12px" }}>
                  <span
                    style={{
                      fontSize: 12,
                      color: "#fbbf24",
                      fontFamily: "JetBrains Mono, monospace",
                      background: "rgba(251,191,36,0.08)",
                      padding: "3px 8px",
                      borderRadius: 6,
                    }}
                  >
                    ◆ {p.price}
                  </span>
                </td>
                <td
                  style={{
                    padding: "12px 12px",
                    fontSize: 12,
                    color: "#64748b",
                    fontFamily: "JetBrains Mono, monospace",
                  }}
                >
                  {r.total}
                </td>
                <td style={{ padding: "12px 12px" }}>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 6 }}
                  >
                    <StarDisplay rating={r.avg} size="sm" />
                    <span
                      style={{
                        fontSize: 11,
                        color: r.avg > 0 ? "#fbbf24" : "#334155",
                      }}
                    >
                      {r.avg > 0 ? r.avg.toFixed(1) : "—"}
                    </span>
                  </div>
                </td>
                <td style={{ padding: "12px 12px" }}>
                  <button
                    onClick={() => onReview(p)}
                    style={{
                      fontSize: 11,
                      padding: "4px 12px",
                      borderRadius: 8,
                      background: "rgba(56,189,248,0.1)",
                      border: "1px solid rgba(56,189,248,0.25)",
                      color: "#38bdf8",
                      cursor: "pointer",
                      fontFamily: "Sora, sans-serif",
                    }}
                  >
                    Xem đánh giá
                  </button>
                </td>
              </motion.tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
