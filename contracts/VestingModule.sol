// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract VestingModule is Ownable {
    struct VestedTokens {
        uint256 claimableAmount;
        uint256 claimedAmount;
    }

    mapping(address => VestedTokens) public addressTokens;
    uint256 public startTime;
    uint256 public cliffTime;
    uint256 public vestingTime;
    IERC20 public equityToken;

    // Constructor initializes the vesting module with recipients, amounts, cliff time, vesting time, and the equity token address
    constructor(
        address[] memory _recipients,
        uint256[] memory _amounts,
        uint256 _cliffTime,
        uint256 _vestingTime,
        address equityTokenAddress,
        address newOwner
    ) {
        require(
            _recipients.length == _amounts.length,
            "Recipients and amounts length mismatch"
        );

        // Set the vested tokens for each recipient
        for (uint256 i = 0; i < _recipients.length; i++) {
            addressTokens[_recipients[i]] = VestedTokens(0, 0);
            addressTokens[_recipients[i]].claimableAmount = _amounts[i];
        }

        startTime = block.timestamp;
        cliffTime = _cliffTime;
        vestingTime = _vestingTime;
        equityToken = IERC20(equityTokenAddress);
        transferOwnership(newOwner);
    }

    // Allows a recipient to claim their vested tokens
    function claim() external {
        VestedTokens storage userTokens = addressTokens[msg.sender];
        uint256 currentTime = block.timestamp;
        uint256 elapsedTime = currentTime - startTime;
        uint256 claimablePercent;

        require(
            startTime + cliffTime <= currentTime,
            "Vested tokens cannot be claimed before the cliff period"
        );
        require(
            userTokens.claimableAmount != 0,
            "Address not a recipient of tokens"
        );
        require(
            userTokens.claimedAmount != userTokens.claimableAmount,
            "All tokens claimed!"
        );

        // If the vesting period is over, claim all remaining tokens
        if (startTime + vestingTime <= currentTime) {
            uint256 remainingTokens = userTokens.claimableAmount -
                userTokens.claimedAmount;
            userTokens.claimedAmount = userTokens.claimableAmount;
            require(equityToken.transfer(msg.sender, remainingTokens * (1 ether)));
        } else {
            // Calculate the claimable percent and update the claimed amount
            claimablePercent = (elapsedTime * 1e18) / vestingTime;
            uint256 claimableAmount = (userTokens.claimableAmount *
                claimablePercent) / 1e18;
            uint256 unclaimedAmount = claimableAmount -
                userTokens.claimedAmount;

            userTokens.claimedAmount = claimableAmount;
            require(equityToken.transfer(msg.sender, unclaimedAmount * (1 ether)));
        }
    }

    function terminateVesting(address otherAddress) public onlyOwner {
        require(addressTokens[otherAddress].claimableAmount != addressTokens[otherAddress].claimedAmount);
        VestedTokens storage userTokens = addressTokens[otherAddress];
        uint256 currentTime = block.timestamp;
        uint256 elapsedTime = currentTime - startTime;
        uint256 claimablePercent;
        if (startTime + cliffTime > currentTime) {
            require(equityToken.transfer(owner(), userTokens.claimableAmount * (1 ether)));
        }
        else {
            claimablePercent = (elapsedTime * 1e18) / vestingTime;
            uint256 claimableAmount = (userTokens.claimableAmount *
                claimablePercent) / 1e18;
            uint256 unclaimedAmount = claimableAmount -
                userTokens.claimedAmount;

            userTokens.claimedAmount = claimableAmount;
            require(equityToken.transfer(otherAddress, unclaimedAmount * (1 ether)));
            require(equityToken.transfer(owner(), (userTokens.claimableAmount - userTokens.claimedAmount) * (1 ether)));
        }

    }
}
