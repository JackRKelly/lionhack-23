// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./EquityToken.sol";
import "./OrderBook.sol";

contract OrderBookFactory {
    event OrderBookDeployed(
        address indexed baseToken,
        address indexed quoteToken,
        address indexed orderBook
    );

    // Constant quoteToken address
    IERC20 public constant quoteToken =
        IERC20(0x0000000000000000000000000000000000001010);

    function createOrderBook(
        uint256 baseTokenInitialSupply, // supply of tokens in ether
        string memory baseTokenName,
        string memory baseTokenSymbol,
        address[] memory recipients,
        uint256[] memory amounts
    ) external {
        require(
            recipients.length == amounts.length,
            "Recipients and amounts length mismatch"
        );
        uint256 baseTokenSupplyEther = baseTokenInitialSupply * (1 ether);
        BaseToken baseToken = new BaseToken(
            baseTokenSupplyEther,
            baseTokenName,
            baseTokenSymbol
        );
        OrderBook orderBook = new OrderBook(baseToken, quoteToken);

        // Allocate tokens to recipients
        for (uint256 i = 0; i < recipients.length; i++) {
            address recipient = recipients[i];
            uint256 amount = amounts[i];
            baseToken.transfer(recipient, amount);
        }

        // Transfer the remaining tokens to the deployer
        baseToken.transfer(msg.sender, baseToken.balanceOf(address(this)));

        emit OrderBookDeployed(
            address(baseToken),
            address(quoteToken),
            address(orderBook)
        );
    }
}
