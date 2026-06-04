import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminPanel({ addProduct, onProductAdded }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    imageUrl: "",
    price: "",
  });
  const [status, setStatus] = useState(null);
  const [txHash, setTxHash] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.description.trim())
      return alert("Tên và mô tả không được để trống!");
    if (!form.price || Number(form.price) <= 0)
      return alert("Giá sản phẩm phải lớn hơn 0!");

    setStatus("pending");
    setError(null);
    setTxHash(null);

    try {
      const receipt = await addProduct(
        form.name.trim(),
        form.description.trim(),
        form.imageUrl.trim(),
        form.price,
      );
      setTxHash(receipt.hash);
      setStatus("success");
      setForm({ name: "", description: "", imageUrl: "", price: "" });
      onProductAdded();
    } catch (err) {
      setStatus("error");
      setError(
        err?.reason || err?.message?.slice(0, 120) || "Giao dịch thất bại!",
      );
    }
  };

  const inputStyle = {
    width: "100%",
    boxSizing: "border-box",
    background: "rgba(5,8,20,0.8)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 10,
    padding: "10px 14px",
    color: "#e2e8f0",
    fontSize: 13,
    fontFamily: "Outfit, sans-serif",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
  };

  const labelStyle = {
    display: "block",
    marginBottom: 6,
    fontSize: 11,
    color: "#64748b",
    fontFamily: "JetBrains Mono, monospace",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
  };

  return (
    <div style={{ marginBottom: 28 }}>
      {/* Header section */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: "rgba(251,191,36,0.12)",
              border: "1px solid rgba(251,191,36,0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: 16 }}>👑</span>
          </div>
          <div>
            <div
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: "#fbbf24",
                fontFamily: "Sora, sans-serif",
              }}
            >
              Thêm sản phẩm mới
            </div>
            <div
              style={{
                fontSize: 10,
                color: "#475569",
                fontFamily: "JetBrains Mono, monospace",
              }}
            >
              Ghi dữ liệu lên Ethereum Blockchain
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div
        style={{
          background: "rgba(8,12,28,0.9)",
          border: "1px solid rgba(251,191,36,0.12)",
          borderRadius: 16,
          padding: 24,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Ambient */}
        <div
          style={{
            position: "absolute",
            top: -30,
            right: -30,
            width: 120,
            height: 120,
            borderRadius: "50%",
            background: "rgba(251,191,36,0.05)",
            filter: "blur(30px)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
        >
          {/* Name */}
          <div>
            <label style={labelStyle}>Tên sản phẩm *</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="iPhone 15 Pro Max"
              style={inputStyle}
              onFocus={(e) => {
                e.target.style.borderColor = "rgba(56,189,248,0.5)";
                e.target.style.boxShadow = "0 0 0 3px rgba(56,189,248,0.08)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(255,255,255,0.08)";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          {/* Price */}
          <div>
            <label style={labelStyle}>Giá (ETH) *</label>
            <input
              type="number"
              step="0.001"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              placeholder="0.01"
              style={inputStyle}
              onFocus={(e) => {
                e.target.style.borderColor = "rgba(56,189,248,0.5)";
                e.target.style.boxShadow = "0 0 0 3px rgba(56,189,248,0.08)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(255,255,255,0.08)";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          {/* Image URL */}
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={labelStyle}>URL hình ảnh</label>
            <input
              type="url"
              value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              placeholder="https://..."
              style={inputStyle}
              onFocus={(e) => {
                e.target.style.borderColor = "rgba(56,189,248,0.5)";
                e.target.style.boxShadow = "0 0 0 3px rgba(56,189,248,0.08)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(255,255,255,0.08)";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          {/* Description */}
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={labelStyle}>Mô tả sản phẩm *</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              placeholder="Mô tả chi tiết về sản phẩm..."
              style={{ ...inputStyle, resize: "none" }}
              onFocus={(e) => {
                e.target.style.borderColor = "rgba(56,189,248,0.5)";
                e.target.style.boxShadow = "0 0 0 3px rgba(56,189,248,0.08)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(255,255,255,0.08)";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>
        </div>

        {/* Status messages */}
        <AnimatePresence>
          {status === "pending" && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{
                marginTop: 16,
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 14px",
                background: "rgba(56,189,248,0.06)",
                border: "1px solid rgba(56,189,248,0.2)",
                borderRadius: 10,
              }}
            >
              <svg
                className="animate-spin"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="2"
              >
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" />
              </svg>
              <span
                style={{
                  fontSize: 12,
                  color: "#38bdf8",
                  fontFamily: "Sora, sans-serif",
                }}
              >
                Đang ghi lên blockchain...
              </span>
            </motion.div>
          )}
          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              style={{
                marginTop: 16,
                padding: "12px 14px",
                background: "rgba(52,211,153,0.07)",
                border: "1px solid rgba(52,211,153,0.2)",
                borderRadius: 10,
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#34d399",
                  marginBottom: 4,
                }}
              >
                ✅ Thêm sản phẩm thành công!
              </div>
              {txHash && (
                <div
                  style={{
                    fontSize: 10,
                    color: "#475569",
                    fontFamily: "JetBrains Mono, monospace",
                    wordBreak: "break-all",
                  }}
                >
                  TX: {txHash}
                </div>
              )}
            </motion.div>
          )}
          {status === "error" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              style={{
                marginTop: 16,
                padding: "12px 14px",
                background: "rgba(248,113,113,0.07)",
                border: "1px solid rgba(248,113,113,0.2)",
                borderRadius: 10,
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#f87171",
                  marginBottom: 4,
                }}
              >
                ❌ Thất bại
              </div>
              <div style={{ fontSize: 11, color: "rgba(252,165,165,0.7)" }}>
                {error}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit */}
        <motion.button
          whileHover={{
            y: -2,
            boxShadow: "0 14px 34px -8px rgba(56,189,248,0.7)",
          }}
          whileTap={{ scale: 0.97 }}
          onClick={handleSubmit}
          disabled={status === "pending"}
          style={{
            marginTop: 18,
            width: "100%",
            padding: "11px",
            borderRadius: 11,
            background:
              status === "pending"
                ? "rgba(56,189,248,0.3)"
                : "linear-gradient(135deg, #67e8f9, #38bdf8, #818cf8)",
            border: "none",
            cursor: status === "pending" ? "not-allowed" : "pointer",
            fontFamily: "Sora, sans-serif",
            fontWeight: 700,
            fontSize: 13,
            color: status === "pending" ? "rgba(255,255,255,0.6)" : "#03121b",
            boxShadow: "0 8px 24px -8px rgba(56,189,248,0.5)",
            transition: "all 0.25s",
          }}
        >
          {status === "pending"
            ? "Đang xử lý..."
            : "🚀 Thêm sản phẩm lên Blockchain"}
        </motion.button>
      </div>
    </div>
  );
}
