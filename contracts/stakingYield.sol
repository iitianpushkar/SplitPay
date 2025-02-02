// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ETHYieldGenerator {
    struct UserInfo {
        uint256 stakedAmount;   // Amount of ETH staked
        uint256 lastClaimTime;  // Last yield claim timestamp
        uint256 accumulatedYield; // Yield accumulated but not claimed
    }

    mapping(address => UserInfo) public userInfo;

    uint256 public constant YIELD_RATE = 10; // 10% yield every 10 seconds
    uint256 public constant YIELD_INTERVAL = 10; // Yield interval in seconds

    event Staked(address indexed user, uint256 amount);
    event YieldClaimed(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);

    // Stake ETH into the contract
    function stake(uint256 amount) external payable {
        require(amount > 0, "Amount must be greater than zero");
        require(msg.value == amount, "Sent ETH must match input amount");

        UserInfo storage user = userInfo[msg.sender];

        // Update accumulated yield before adding new stake
        if (user.stakedAmount > 0) {
            updateYield(msg.sender);
        }

        // Increase the staked amount
        user.stakedAmount += amount;
        user.lastClaimTime = block.timestamp;

        emit Staked(msg.sender, amount);
    }

    // Calculate the yield earned since the last claim
    function calculateYield(address user) public view returns (uint256) {
        UserInfo storage userInfoData = userInfo[user];
        if (userInfoData.stakedAmount == 0) return 0;

        uint256 timeElapsed = block.timestamp - userInfoData.lastClaimTime;
        uint256 periods = timeElapsed / YIELD_INTERVAL; // Number of 10s periods elapsed

        return (userInfoData.stakedAmount * YIELD_RATE / 100) * periods;
    }

    // Updates the accumulated yield
    function updateYield(address user) internal {
        uint256 newYield = calculateYield(user);
        userInfo[user].accumulatedYield += newYield;
        userInfo[user].lastClaimTime = block.timestamp;
    }

    // Claim yield
    function claimYield() external {
        updateYield(msg.sender);
        uint256 yieldToClaim = userInfo[msg.sender].accumulatedYield;
        require(yieldToClaim > 0, "No yield available");
        require(address(this).balance >= yieldToClaim, "Contract has insufficient funds");

        userInfo[msg.sender].accumulatedYield = 0;

        // Transfer ETH as yield
        payable(msg.sender).transfer(yieldToClaim);

        emit YieldClaimed(msg.sender, yieldToClaim);
    }

    // Get available yield
    function getAvailableYield(address user) external view returns (uint256) {
        return userInfo[user].accumulatedYield + calculateYield(user);
    }

    // Withdraw staked ETH
    function withdrawStake() external {
        UserInfo storage user = userInfo[msg.sender];
        require(user.stakedAmount > 0, "No stake found");

        updateYield(msg.sender);
        uint256 amountToWithdraw = user.stakedAmount;
        user.stakedAmount = 0;

        payable(msg.sender).transfer(amountToWithdraw);

        emit Withdrawn(msg.sender, amountToWithdraw);
    }

    // Contract can receive ETH
    receive() external payable {}
}
