// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract OrderBook {
    struct Order {
        address trader;
        uint256 amount;
        uint256 price;
        bool isBuyOrder;
    }

    IERC20 public baseToken;
    IERC20 public quoteToken;

    uint256 public nextOrderId;
    mapping(uint256 => Order) public orders;

    event OrderPlaced(
        uint256 indexed orderId,
        address indexed trader,
        uint256 amount,
        uint256 price,
        bool isBuyOrder
    );
    event OrderCanceled(uint256 indexed orderId);
    event OrderExecuted(
        uint256 indexed orderId,
        uint256 indexed counterOrderId
    );

    constructor(IERC20 _baseToken, IERC20 _quoteToken) {
        baseToken = _baseToken;
        quoteToken = _quoteToken;
        nextOrderId = 1;
    }

    function placeOrder(
        uint256 amount,
        uint256 price,
        bool isBuyOrder
    ) external {
        require(amount > 0, "Amount must be greater than 0");
        require(price > 0, "Price must be greater than 0");

        uint256 orderId = nextOrderId++;
        orders[orderId] = Order(msg.sender, amount, price, isBuyOrder);
        emit OrderPlaced(orderId, msg.sender, amount, price, isBuyOrder);
    }

    function cancelOrder(uint256 orderId) external {
        Order storage order = orders[orderId];
        require(order.trader == msg.sender, "Not the order owner");

        delete orders[orderId];
        emit OrderCanceled(orderId);
    }

    function executeOrders(uint256 orderId, uint256 counterOrderId) external {
        Order storage order = orders[orderId];
        Order storage counterOrder = orders[counterOrderId];

        require(
            order.isBuyOrder != counterOrder.isBuyOrder,
            "Orders must be opposite types"
        );
        require(
            (order.isBuyOrder && order.price >= counterOrder.price) ||
                (!order.isBuyOrder && order.price <= counterOrder.price),
            "Unmatched prices"
        );

        uint256 executedAmount = order.amount < counterOrder.amount
            ? order.amount
            : counterOrder.amount;
        uint256 baseAmount = executedAmount;
        uint256 quoteAmount = executedAmount * order.price;

        if (order.isBuyOrder) {
            require(
                baseToken.transferFrom(
                    order.trader,
                    counterOrder.trader,
                    baseAmount
                ),
                "Base token transfer failed"
            );
            require(
                quoteToken.transferFrom(
                    counterOrder.trader,
                    order.trader,
                    quoteAmount
                ),
                "Quote token transfer failed"
            );
        } else {
            require(
                baseToken.transferFrom(
                    counterOrder.trader,
                    order.trader,
                    baseAmount
                ),
                "Base token transfer failed"
            );
            require(
                quoteToken.transferFrom(
                    order.trader,
                    counterOrder.trader,
                    quoteAmount
                ),
                "Quote token transfer failed"
            );
        }

        order.amount -= executedAmount;
        counterOrder.amount -= executedAmount;

        if (order.amount == 0) {
            delete orders[orderId];
        }

        if (counterOrder.amount == 0) {
            delete orders[counterOrderId];
        }

        emit OrderExecuted(orderId, counterOrderId);
    }
}
