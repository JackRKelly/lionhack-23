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
        uint256 equityTokenInitialSupply, // supply of tokens in ether
        string memory equityTokenName,
        string memory equityTokenSymbol,
        address[] memory recipients,
        uint256[] memory amounts
    ) external {
        require(
            recipients.length == amounts.length,
            "Recipients and amounts length mismatch"
        );
        uint256 equityTokenSupplyEther = equityTokenInitialSupply * (1 ether);
        EquityToken equityToken = new EquityToken(
            equityTokenSupplyEther,
            equityTokenName,
            equityTokenSymbol
        );
        OrderBook orderBook = new OrderBook(equityToken, quoteToken);

        // Allocate tokens to recipients
        for (uint256 i = 0; i < recipients.length; i++) {
            address recipient = recipients[i];
            uint256 amount = amounts[i];
            equityToken.transfer(recipient, amount);
        }

        // Transfer the remaining tokens to the deployer
        equityToken.transfer(msg.sender, equityToken.balanceOf(address(this)));

        emit OrderBookDeployed(
            address(equityToken),
            address(quoteToken),
            address(orderBook)
        );
    }
}