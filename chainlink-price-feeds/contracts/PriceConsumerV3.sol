// SPDX-License_identifier: MIT

pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract DataConsumerV3 {

    AggregatorV3Interface internal dataFeed;

    // Network: Sepolia
    // Aggregator: BTC/USD
    // Address: 0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43

    constructor() {
        dataFeed = AggregatorV3Interface(0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43)
    };

    function getChainLinkDataFeedLatestAnswer() external returns (int) {
        (,int answer,,,) = dataFeed.latestRoundData();
        return answer;
    }

}