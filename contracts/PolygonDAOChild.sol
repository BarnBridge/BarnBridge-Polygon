// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {FxBaseChildTunnel} from "./matic/FxBaseChildTunnel.sol";

contract PolygonDAOChild is FxBaseChildTunnel {
    uint256 public latestStateId;
    address public latestRootMessageSender;
    bytes public latestData;

    constructor(address _fxChild) FxBaseChildTunnel(_fxChild) {}

    function _processMessageFromRoot(
        uint256 stateId,
        address sender,
        bytes memory data
    ) internal override validateSender(sender) {
        latestStateId = stateId;
        latestRootMessageSender = sender;
        latestData = data;
    }

    function sendMessageToRoot(bytes memory message) public {
        _sendMessageToRoot(message);
    }
}
