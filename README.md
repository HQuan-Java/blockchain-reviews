# ⛓️ ChainReview — Hệ thống đánh giá sản phẩm minh bạch trên Blockchain

<div align="center">

![Blockchain](https://img.shields.io/badge/Blockchain-Ethereum-blue?style=for-the-badge&logo=ethereum)
![Solidity](https://img.shields.io/badge/Solidity-0.8.19-purple?style=for-the-badge&logo=solidity)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite)
![ethers.js](https://img.shields.io/badge/ethers.js-v6-2535a0?style=for-the-badge)

**Đồ án môn Công nghệ Blockchain — Trường Đại Học Đại Nam — 2024**

*Sinh viên: Trần Hồng Quân — MSV: 1671020266*

</div>

---

## 📌 Giới thiệu

**ChainReview** là một DApp (Decentralized Application) cho phép người dùng đánh giá sản phẩm một cách **minh bạch và bất biến** trên nền tảng Ethereum Blockchain.

> Mọi đánh giá được lưu trữ vĩnh viễn trên blockchain — không thể sửa đổi, không thể xóa, và chỉ người dùng đã mua sản phẩm thật mới được phép đánh giá.

---

## ✨ Tính năng chính

| Tính năng | Mô tả |
|-----------|-------|
| 🛒 **Mua hàng on-chain** | Thanh toán ETH trực tiếp qua smart contract |
| ⭐ **Đánh giá xác thực** | Chỉ người mua thật mới được gửi đánh giá (1–5 sao) |
| 🛡️ **Chống spam** | Mỗi địa chỉ ví chỉ review 1 lần / sản phẩm |
| 📊 **Xếp hạng tự động** | Tính điểm trung bình trực tiếp từ smart contract |
| 👑 **Phân quyền Admin/User** | Admin quản lý sản phẩm, User xem và đánh giá |
| 🔗 **Hoàn toàn phi tập trung** | Không có backend truyền thống, dữ liệu lưu trên chain |

---

## 🏗️ Kiến trúc hệ thống

```
👥 Người dùng (Admin / User)
        │
        ▼
🦊 MetaMask (Wallet / Signer)
        │
        ▼
⚛️  React 18 + Vite (Frontend DApp)
   ├── AdminDashboard  (isOwner = true)
   │     ├── AdminPanel — thêm sản phẩm
   │     └── Sidebar, Stat cards, Product table
   └── UserStorefront  (isOwner = false)
         ├── HeroSection
         ├── ProductCard grid
         └── ReviewModal
        │
        ▼
🔗 useBlockchain.js Hook + ethers.js v6
   ├── connectWallet / BrowserProvider
   ├── addProduct / buyProduct
   └── addReview / getAverageRating
        │
        ▼
📜 Smart Contract — ProductReview.sol (Solidity ^0.8.19)
   ├── addProduct()     — onlyOwner
   ├── buyProduct()     — payable
   ├── addReview()      — đã mua + chưa review
   └── view functions   — getAllProducts, getAverageRating
        │
        ▼
⛓️  Ganache Local Blockchain
    Chain ID: 1337 · Port: 8545
```

---

## 🛠️ Công nghệ sử dụng

| Layer | Công nghệ |
|-------|-----------|
| **Blockchain** | Ethereum (Ganache local) |
| **Smart Contract** | Solidity ^0.8.19 |
| **Deploy tool** | Remix IDE |
| **Web3** | ethers.js v6 |
| **Frontend** | React 18 + Vite |
| **Styling** | Tailwind CSS |
| **Animation** | Framer Motion |
| **Wallet** | MetaMask Extension |

---

## 📁 Cấu trúc thư mục

```
blockchain-reviews/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── AdminDashboard.jsx   # Sidebar dashboard cho admin
│   │   ├── AdminPanel.jsx       # Form thêm sản phẩm
│   │   ├── UserStorefront.jsx   # Giao diện user
│   │   ├── ReviewModal.jsx      # Modal xem & gửi đánh giá
│   │   ├── StarRating.jsx       # Component chọn sao
│   │   └── ParticleField.jsx    # Hiệu ứng nền canvas
│   ├── hooks/
│   │   └── useBlockchain.js     # Toàn bộ Web3 logic
│   ├── utils/
│   │   └── contract.js          # ABI + CONTRACT_ADDRESS
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── ProductReview.sol             # Smart contract
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 🚀 Hướng dẫn cài đặt & chạy

### Yêu cầu

- [Node.js](https://nodejs.org/) >= 18
- [MetaMask](https://metamask.io/) extension trên trình duyệt
- [Ganache](https://trufflesuite.com/ganache/) CLI
- [Remix IDE](https://remix.ethereum.org/) (deploy contract)

### Bước 1 — Clone & cài dependencies

```bash
git clone https://github.com/YOUR_USERNAME/blockchain-reviews.git
cd blockchain-reviews
npm install
```

### Bước 2 — Khởi động Ganache

```bash
# Cài ganache nếu chưa có
npm install -g ganache

# Chạy với mnemonic cố định (accounts không đổi khi restart)
ganache --port 8545 --mnemonic "test test test test test test test test test test test junk"
```

### Bước 3 — Deploy Smart Contract

1. Mở [Remix IDE](https://remix.ethereum.org/)
2. Tạo file mới → paste toàn bộ nội dung `ProductReview.sol`
3. Compile với Solidity `0.8.19`
4. Chọn Environment: **Injected Provider - MetaMask**
5. Kết nối MetaMask với Ganache (import private key account[0])
6. Click **Deploy**
7. Copy địa chỉ contract vừa deploy

### Bước 4 — Cập nhật CONTRACT_ADDRESS

Mở file `src/utils/contract.js`, thay địa chỉ contract:

```js
export const CONTRACT_ADDRESS = "0xYOUR_CONTRACT_ADDRESS_HERE";
```

### Bước 5 — Import tài khoản vào MetaMask

1. Mở MetaMask → **Import Account**
2. Dán private key từ Ganache (account[0] = Admin, account[1] = User thường)
3. Chuyển network sang **Ganache Local** (Chain ID: 1337, RPC: http://127.0.0.1:8545)

### Bước 6 — Chạy ứng dụng

```bash
npm run dev
```

Mở trình duyệt tại `http://localhost:5173`

---

## 👤 Phân quyền

| Role | Điều kiện | Quyền |
|------|-----------|-------|
| **Admin** | Địa chỉ ví = `owner` trong contract | Thêm sản phẩm, xem dashboard thống kê |
| **User** | Bất kỳ ví nào khác | Xem sản phẩm, mua hàng, gửi đánh giá |

---

## 📜 Smart Contract

**File:** `ProductReview.sol`  
**Compiler:** Solidity ^0.8.19  
**Network:** Ganache Local (Chain ID: 1337)

### Các hàm chính

```solidity
// Thêm sản phẩm — chỉ admin
function addProduct(string name, string description, string imageUrl, uint256 price) onlyOwner

// Mua sản phẩm — gửi ETH
function buyProduct(uint256 productId) payable

// Đánh giá — phải mua trước, chỉ 1 lần
function addReview(uint256 productId, uint8 stars, string content)

// Lấy điểm trung bình
function getAverageRating(uint256 productId) view returns (uint256 avg, uint256 total)
```

---

## 🔒 Cơ chế bảo mật

- ✅ `onlyOwner` — chỉ admin mới thêm được sản phẩm
- ✅ `hasPurchased` mapping — bắt buộc mua trước khi review
- ✅ `hasReviewed` mapping — mỗi ví chỉ review 1 lần / sản phẩm
- ✅ Validate số sao 1–5, nội dung không được rỗng
- ✅ Dữ liệu bất biến — không ai có thể xóa hay sửa đánh giá

---

## 📄 License

MIT License — Đồ án học thuật, Trường Đại Học Đại Nam 2024
