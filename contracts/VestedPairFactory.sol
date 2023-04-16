// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./EquityToken.sol";
import "./OrderBook.sol";
import "./VestingModule.sol";

contract OrderBookFactory {
    event OrderBookDeployed(address[4] deployedContracts);

    // Constant quoteToken address
    IERC20 public constant quoteToken =
        IERC20(0x0000000000000000000000000000000000001010);

    function createOrderBook(
        uint256 equityTokenInitialSupply, // supply of tokens in ether
        string memory equityTokenName,
        string memory equityTokenSymbol,
        address[] memory recipients,
        uint256[] memory amounts,
        uint256 cliffTime,
        uint256 vestingTime
    ) external {
        require(
            recipients.length == amounts.length,
            "Recipients and amounts length mismatch"
        );

        uint256 total = 0;
        // Allocate tokens to recipients
        for (uint256 i = 0; i < amounts.length; i++) {
            total += amounts[i];
        }

        require(total <= equityTokenInitialSupply, "Cannot distribute more tokens than initial supply");

        uint256 equityTokenSupplyEther = equityTokenInitialSupply * (1 ether);
        EquityToken equityToken = new EquityToken(
            equityTokenSupplyEther,
            equityTokenName,
            equityTokenSymbol
        );
        OrderBook orderBook = new OrderBook(equityToken, quoteToken);

        VestingModule vestingModule = new VestingModule(
            recipients,
            amounts,
            cliffTime,
            vestingTime,
            address(equityToken),
            msg.sender
        );

        equityToken.transfer(address(vestingModule), total * (1 ether));

        // Transfer the remaining tokens to the deployer
        equityToken.transfer(msg.sender, equityToken.balanceOf(address(this)));

        address[4] memory deployedContracts = [
            address(equityToken),
            address(quoteToken),
            address(orderBook),
            address(vestingModule)
        ];

        emit OrderBookDeployed(deployedContracts);
    }
}
