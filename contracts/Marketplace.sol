// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

pragma solidity ^0.8.0;

contract Marketplace {
    address public owner;

    struct Product {
        uint256 price; // Price in ETH (wei)
        string name;
        address seller; // Seller's address
    }

    mapping(uint256 => Product) public products;
    uint256 public productCount;

    event ProductListed(uint256 indexed productId, uint256 price, string name, address seller);
    event PaymentProcessed(address indexed buyer, address indexed seller, uint256 paymentAmount);
    event FundDeposited(address indexed sender, uint256 amount);
    event Withdrawn(address indexed owner, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function listProduct(string calldata name, uint256 price, address seller) external onlyOwner {
        require(price > 0, "Price must be greater than zero");
        require(seller != address(0), "Invalid seller address");

        productCount++;
        products[productCount] = Product(price, name, seller);

        emit ProductListed(productCount, price, name, seller);
    }

    function buyProduct(uint256 productId) external payable {
    Product memory product = products[productId];
    require(product.price > 0, "Product does not exist");
    require(msg.value == product.price, "Incorrect ETH amount sent");

    // Pay the seller directly
    payable(product.seller).transfer(msg.value);

    emit PaymentProcessed(msg.sender, product.seller, msg.value);
}


    function getProducts() external view returns (Product[] memory) {
        Product[] memory productList = new Product[](productCount);
        for (uint256 i = 0; i < productCount; i++) {
            productList[i] = products[i + 1];
        }
        return productList;
    }

    // Function to deposit ETH into the contract
    function depositETH() external payable {
        require(msg.value > 0, "Must send ETH");
        emit FundDeposited(msg.sender, msg.value);
    }

    // Allow owner to withdraw ETH from the contract
    function withdrawETH() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No ETH to withdraw");

        payable(owner).transfer(balance);
        emit Withdrawn(owner, balance);
    }

    // Receive ETH fallback function
    receive() external payable {
        emit FundDeposited(msg.sender, msg.value);
    }
}
