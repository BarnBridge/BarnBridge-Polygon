pragma solidity ^0.8.4;

import {IRootChainManager} from "../matic/IRootChainManager.sol";

contract RootChainManager is IRootChainManager {
    function depositEtherFor(address user) external payable override {}

    function depositFor(
        address user,
        address rootToken,
        bytes calldata depositData
    ) external override {}

    function exit(bytes calldata inputData) external override {
    }
}
