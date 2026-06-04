// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title ProductReview
 * @dev Hệ thống đánh giá sản phẩm minh bạch sử dụng Blockchain
 * @author Blockchain Project - 2024
 */

contract ProductReview {

    // ========================
    // STRUCTS
    // ========================

    struct Product {
        uint256 productId;
        string name;
        string description;
        string imageUrl;
        uint256 price; // giá ETH
        address addedBy;
        uint256 createdAt;
        bool exists;
    }

    struct Review {
        uint256 reviewId;
        uint256 productId;
        address reviewer;
        uint8 stars;
        string content;
        uint256 timestamp;
    }

    // ========================
    // STATE VARIABLES
    // ========================

    address public owner;

    uint256 public productCount;
    uint256 public reviewCount;

    mapping(uint256 => Product) public products;

    mapping(uint256 => Review[]) public productReviews;

    // chống spam review
    mapping(uint256 => mapping(address => bool)) public hasReviewed;

    // kiểm tra đã mua chưa
    mapping(uint256 => mapping(address => bool)) public hasPurchased;

    // ========================
    // EVENTS
    // ========================

    event ProductAdded(
        uint256 indexed productId,
        string name,
        uint256 price,
        address addedBy
    );

    event ProductPurchased(
        uint256 indexed productId,
        address indexed buyer,
        uint256 price,
        uint256 timestamp
    );

    event ReviewAdded(
        uint256 indexed productId,
        address indexed reviewer,
        uint8 stars,
        uint256 timestamp
    );

    // ========================
    // MODIFIERS
    // ========================

    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "Chi admin moi co quyen thuc hien!"
        );
        _;
    }

    modifier productExists(uint256 _productId) {
        require(
            products[_productId].exists,
            "San pham khong ton tai!"
        );
        _;
    }

    // ========================
    // CONSTRUCTOR
    // ========================

    constructor() {
        owner = msg.sender;
    }

    // ========================
    // ADMIN FUNCTIONS
    // ========================

    function addProduct(
        string memory _name,
        string memory _description,
        string memory _imageUrl,
        uint256 _price
    ) public onlyOwner {

        require(
            bytes(_name).length > 0,
            "Ten san pham khong duoc rong!"
        );

        require(
            _price > 0,
            "Gia san pham phai lon hon 0!"
        );

        productCount++;

        products[productCount] = Product({
            productId: productCount,
            name: _name,
            description: _description,
            imageUrl: _imageUrl,
            price: _price,
            addedBy: msg.sender,
            createdAt: block.timestamp,
            exists: true
        });

        emit ProductAdded(
            productCount,
            _name,
            _price,
            msg.sender
        );
    }

    // ========================
    // BUY PRODUCT
    // ========================

    function buyProduct(uint256 _productId)
        public
        payable
        productExists(_productId)
    {
        Product memory product = products[_productId];

        require(
            msg.value >= product.price,
            "Khong du ETH de mua san pham!"
        );

        require(
            !hasPurchased[_productId][msg.sender],
            "Ban da mua san pham nay roi!"
        );

        // đánh dấu đã mua
        hasPurchased[_productId][msg.sender] = true;

        // chuyển ETH cho admin
        payable(owner).transfer(msg.value);

        emit ProductPurchased(
            _productId,
            msg.sender,
            msg.value,
            block.timestamp
        );
    }

    // ========================
    // REVIEW
    // ========================

    function addReview(
        uint256 _productId,
        uint8 _stars,
        string memory _content
    )
        public
        productExists(_productId)
    {

        // PHẢI MUA MỚI ĐƯỢC REVIEW
        require(
            hasPurchased[_productId][msg.sender],
            "Ban phai mua san pham truoc khi danh gia!"
        );

        // chỉ review 1 lần
        require(
            !hasReviewed[_productId][msg.sender],
            "Ban da danh gia san pham nay roi!"
        );

        // kiểm tra số sao
        require(
            _stars >= 1 && _stars <= 5,
            "So sao phai tu 1 den 5!"
        );

        // kiểm tra nội dung
        require(
            bytes(_content).length > 0,
            "Noi dung danh gia khong duoc rong!"
        );

        reviewCount++;

        productReviews[_productId].push(
            Review({
                reviewId: reviewCount,
                productId: _productId,
                reviewer: msg.sender,
                stars: _stars,
                content: _content,
                timestamp: block.timestamp
            })
        );

        hasReviewed[_productId][msg.sender] = true;

        emit ReviewAdded(
            _productId,
            msg.sender,
            _stars,
            block.timestamp
        );
    }

    // ========================
    // READ FUNCTIONS
    // ========================

    function getProduct(uint256 _productId)
        public
        view
        productExists(_productId)
        returns (Product memory)
    {
        return products[_productId];
    }

    function getAllProducts()
        public
        view
        returns (Product[] memory)
    {
        Product[] memory allProducts =
            new Product[](productCount);

        for (uint256 i = 1; i <= productCount; i++) {
            allProducts[i - 1] = products[i];
        }

        return allProducts;
    }

    function getReviewsByProduct(uint256 _productId)
        public
        view
        productExists(_productId)
        returns (Review[] memory)
    {
        return productReviews[_productId];
    }

    function getAverageRating(uint256 _productId)
        public
        view
        productExists(_productId)
        returns (
            uint256 avgRating,
            uint256 totalReviews
        )
    {
        Review[] memory reviews =
            productReviews[_productId];

        totalReviews = reviews.length;

        if (totalReviews == 0) {
            return (0, 0);
        }

        uint256 totalStars = 0;

        for (uint256 i = 0; i < totalReviews; i++) {
            totalStars += reviews[i].stars;
        }

        avgRating =
            (totalStars * 10) /
            totalReviews;

        return (avgRating, totalReviews);
    }

    function checkHasReviewed(
        uint256 _productId,
        address _user
    )
        public
        view
        returns (bool)
    {
        return hasReviewed[_productId][_user];
    }

    function checkHasPurchased(
        uint256 _productId,
        address _user
    )
        public
        view
        returns (bool)
    {
        return hasPurchased[_productId][_user];
    }
}