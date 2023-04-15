// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract VestingModule {

    struct VestedTokens {
        uint256 claimableAmount;
        uint256 claimedAmount;
    }

    mapping(address => VestedTokens) public addressTokens;
    uint256 public startTime;
    uint256 public cliffTime;
    uint256 public vestingTime;

    constructor(
        address[] memory _recipients,
        uint256[] memory _amounts,
        uint256 _cliffTime,
        uint256 _vestingTime
    ) {
        for (uint256 i = 0; i < _recipients.length; i++) {
            addressTokens[_recipients[i]] = _amounts[i];
        }
        startTime = block.timestamp;
        cliffTime = _cliffTime;
        vestingTime = _vestingTime;
    }

    function claim() external {
        require(startTime + cliffTime < block.timestamp, "Vested tokens cannot be claimed before the cliff period");
        require(addressTokens[msg.sender], "Address not a recipient of tokens");

        if (startTime + vestingTime < block.timestamp) {
            emit Transfer(msg.sender, addressTokens[msg.sender].claimableAmount - addressTokens[msg.sender].claimedAmount);
        }
        else {
            emit Transfer(msg.sender,  ((addressTokens[msg.sender].claimableAmount * (block.timestamp - startTime)) / vestingTime) - addressTokens[msg.sender].claimedAmount);
        }
    }
}
