import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { StarDisplay, StarInput } from "./StarRating";

function formatDate(timestamp) {
  return new Date(timestamp * 1000).toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function shortAddr(addr) {
  return `${addr.slice(0, 8)}...${addr.slice(-6)}`;
}

export default function ReviewModal({
  product,
  account,
  isOwner,
  onClose,
  addReview,
  getReviews,
  getAverageRating,
  checkHasReviewed,
  checkHasPurchased,
}) {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState({ avg: 0, total: 0 });
  const [hasReviewed, setHasReviewed] = useState(false);
  const [loading, setLoading] = useState(true);

  const [stars, setStars] = useState(0);
  const [content, setContent] = useState("");
  const [txStatus, setTxStatus] = useState(null);
  const [txHash, setTxHash] = useState(null);
  const [txError, setTxError] = useState(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [r, avg, reviewed] = await Promise.all([
        getReviews(product.productId),
        getAverageRating(product.productId),
        checkHasReviewed(product.productId),
      ]);
      setReviews(r.reverse());
      setRating(avg);
      setHasReviewed(reviewed);
    } finally {
      setLoading(false);
    }
  }, [product.productId, getReviews, getAverageRating, checkHasReviewed]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSubmitReview = async () => {
    if (!account) return alert("Vui lòng kết nối MetaMask trước!");
    if (stars === 0) return alert("Vui lòng chọn số sao!");
    if (!content.trim()) return alert("Vui lòng nhập nội dung đánh giá!");

    setTxStatus("pending");
    setTxError(null);
    setTxHash(null);

    try {
      const hasPurchased = await checkHasPurchased(product.productId);
      if (!hasPurchased) {
        throw new Error("Bạn chưa mua sản phẩm này!");
      }

      const receipt = await addReview(product.productId, stars, content.trim());
      setTxHash(receipt.hash);
      setTxStatus("success");
      setStars(0);
      setContent("");
      await loadData();
    } catch (err) {
      console.error(err);
      setTxStatus("error");

      let message = "Giao dịch thất bại!";
      if (err?.message?.includes("Bạn chưa mua")) {
        message = "❌ Bạn phải mua sản phẩm trước khi đánh giá!";
      } else if (err?.message?.includes("Đã đánh giá")) {
        message = "⚠️ Bạn đã đánh giá sản phẩm này rồi!";
      } else if (err?.message?.includes("user rejected")) {
        message = "⚠️ Bạn đã huỷ giao dịch MetaMask.";
      } else {
        message = err?.reason || err?.message?.slice(0, 120) || message;
      }
      setTxError(message);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="modal-backdrop fixed inset-0 z-[60] flex items-center justify-center bg-dark-950/70 p-4"
      onClick={handleOverlayClick}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
        className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-dark-800/95 shadow-2xl shadow-black/60"
      >
        {/* glowing top edge */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/70 to-transparent" />
        <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-2/3 -translate-x-1/2 rounded-full bg-sky-500/10 blur-3xl" />

        {/* Header */}
        <div className="relative flex items-start justify-between border-b border-white/[0.06] p-6">
          <div className="min-w-0 flex-1 pr-4">
            <div className="mb-1 flex items-center gap-2">
              <span className="badge border border-sky-500/20 bg-sky-500/10 text-sky-300">
                #{product.productId}
              </span>
              <span className="badge border border-emerald-500/20 bg-emerald-500/10 text-emerald-300">
                🔗 On-chain
              </span>
            </div>
            <h2 className="truncate font-display text-xl font-bold leading-tight text-white">
              {product.name}
            </h2>
            <p className="mt-1 line-clamp-1 text-sm text-slate-400">
              {product.description}
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-white/5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          {/* Rating summary */}
          {!loading && (
            <div className="border-b border-white/[0.06] p-6">
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="font-display text-5xl font-black text-white text-glow">
                    {rating.avg > 0 ? rating.avg.toFixed(1) : "—"}
                  </div>
                  <div className="mt-1 flex justify-center">
                    <StarDisplay rating={rating.avg} size="md" />
                  </div>
                  <div className="mt-1 font-mono text-xs text-slate-500">
                    {rating.total} đánh giá
                  </div>
                </div>
                <div className="flex-1 space-y-1.5">
                  {[5, 4, 3, 2, 1].map((s) => {
                    const count = reviews.filter((r) => r.stars === s).length;
                    const pct =
                      rating.total > 0 ? (count / rating.total) * 100 : 0;
                    return (
                      <div key={s} className="flex items-center gap-2">
                        <span className="w-4 font-mono text-xs text-slate-500">
                          {s}
                        </span>
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-dark-700">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-300 shadow-glow-amber"
                          />
                        </div>
                        <span className="w-6 font-mono text-xs text-slate-600">
                          {count}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Write review form */}
          {account && !isOwner && (
            <div className="border-b border-white/[0.06] p-6">
              {hasReviewed ? (
                <div className="flex items-center gap-3 rounded-xl border border-emerald-500/15 bg-emerald-500/5 p-4">
                  <span className="text-2xl">✅</span>
                  <div>
                    <div className="text-sm font-semibold text-emerald-400">
                      Đã đánh giá
                    </div>
                    <div className="mt-0.5 text-xs text-slate-400">
                      Đánh giá của bạn đã được lưu vĩnh viễn lên blockchain
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="mb-4 font-display font-semibold text-white">
                    Viết đánh giá
                  </h3>
                  <div className="mb-4">
                    <label className="mb-2 block text-xs text-slate-400">
                      Chọn số sao *
                    </label>
                    <StarInput value={stars} onChange={setStars} />
                  </div>
                  <div className="mb-4">
                    <label className="mb-2 block text-xs text-slate-400">
                      Nội dung đánh giá *
                    </label>
                    <textarea
                      className="input-field resize-none"
                      rows={3}
                      placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm này..."
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      maxLength={500}
                    />
                    <div className="mt-1 text-right text-xs text-slate-600">
                      {content.length}/500
                    </div>
                  </div>

                  {txStatus === "pending" && (
                    <div className="mb-4 flex items-center gap-3 rounded-xl border border-sky-500/20 bg-sky-500/5 p-3">
                      <svg
                        className="h-5 w-5 flex-shrink-0 animate-spin text-sky-400"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" />
                      </svg>
                      <div>
                        <div className="text-sm font-semibold text-sky-400">
                          Đang ghi lên Blockchain...
                        </div>
                        <div className="text-xs text-slate-500">
                          Vui lòng xác nhận trong MetaMask
                        </div>
                      </div>
                    </div>
                  )}

                  {txStatus === "success" && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mb-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 shadow-glow-emerald"
                    >
                      <div className="mb-1 text-sm font-semibold text-emerald-400">
                        ✅ Thành công!
                      </div>
                      {txHash && (
                        <div className="text-[11px] text-slate-500">
                          TX: <span className="tx-hash">{txHash}</span>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {txStatus === "error" && (
                    <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/5 p-3">
                      <div className="mb-1 text-sm font-semibold text-red-400">
                        ❌ Thất bại
                      </div>
                      <div className="text-xs text-red-300/70">{txError}</div>
                    </div>
                  )}

                  <button
                    onClick={handleSubmitReview}
                    disabled={txStatus === "pending" || stars === 0}
                    className="btn-primary w-full"
                  >
                    {txStatus === "pending" ? (
                      "Đang xử lý..."
                    ) : (
                      <>
                        <svg
                          className="h-4 w-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                        </svg>
                        Gửi lên Blockchain
                      </>
                    )}
                  </button>
                  <p className="mt-2 text-center font-mono text-xs text-slate-600">
                    Đánh giá sẽ được lưu vĩnh viễn • Không thể xóa
                  </p>
                </div>
              )}
            </div>
          )}

          {!account && (
            <div className="border-b border-white/[0.06] p-6 text-center">
              <p className="text-sm text-slate-500">
                Kết nối MetaMask để viết đánh giá
              </p>
            </div>
          )}

          {/* Reviews list */}
          <div className="p-6">
            <h3 className="mb-4 flex items-center gap-2 font-display font-semibold text-white">
              Tất cả đánh giá
              <span className="badge bg-sky-500/10 text-sky-300">
                {reviews.length}
              </span>
            </h3>

            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="shimmer h-24 rounded-xl" />
                ))}
              </div>
            ) : reviews.length === 0 ? (
              <div className="py-10 text-center">
                <div className="mb-3 text-4xl">💬</div>
                <p className="text-sm text-slate-500">Chưa có đánh giá nào</p>
                <p className="mt-1 text-xs text-slate-600">
                  Hãy là người đầu tiên đánh giá!
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {reviews.map((review, idx) => (
                  <motion.div
                    key={review.reviewId}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="relative overflow-hidden rounded-xl border border-white/[0.05] bg-dark-700/40 p-4"
                  >
                    <div className="absolute left-0 top-0 h-full w-0.5 bg-gradient-to-b from-sky-400/60 to-violet-500/40" />
                    <div className="mb-2 flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-2">
                        <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-sky-500/20">
                          <span className="font-mono text-xs font-bold text-sky-400">
                            {review.reviewer.slice(2, 4).toUpperCase()}
                          </span>
                        </div>
                        <span className="truncate font-mono text-xs text-slate-400">
                          {shortAddr(review.reviewer)}
                        </span>
                        {account &&
                          review.reviewer.toLowerCase() ===
                            account.toLowerCase() && (
                            <span className="badge bg-sky-500/10 text-sky-300">
                              Bạn
                            </span>
                          )}
                      </div>
                      <div className="flex-shrink-0 text-right">
                        <StarDisplay rating={review.stars} size="sm" />
                        <div className="mt-0.5 font-mono text-[10px] text-slate-600">
                          {formatDate(review.timestamp)}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed text-slate-300">
                      {review.content}
                    </p>
                    <div className="mt-2 flex items-center gap-1">
                      <svg
                        className="h-3 w-3 text-emerald-500"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-mono text-[10px] text-slate-600">
                        Verified on-chain • Review #{review.reviewId}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
