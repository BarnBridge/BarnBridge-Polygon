// SPDX-License-Identifier: MIT
pragma solidity ^0.8.5;

import "@openzeppelin/contracts/access/Ownable.sol";
import {FxBaseRootTunnel} from "./matic/FxBaseRootTunnel.sol";

/// @title PolygonDAORoot
/// @author Alex T
/// @notice Root chain side of a Polygon data bridge meant to execute commands on the child chain
/// @dev This can be used to forward commands given by the DAO to be executed on the child chain
contract PolygonDAORoot is FxBaseRootTunnel, Ownable {
    bytes public latestData;

    event CallOnChild(address indexed caller, address target, uint256 value, bytes4 sig);

    constructor(address _checkpointManager, address _fxRoot) FxBaseRootTunnel(_checkpointManager, _fxRoot) {
    }

    function _processMessageFromChild(bytes memory data) internal override {
        latestData = data;
    }

    function sendMessageToChild(bytes memory message) public onlyOwner {
        _sendMessageToChild(message);
    }

    function callOnChild(address _target, uint256 _value, bytes memory _data) public onlyOwner {
        require(_target != address(0), "PolygonDAORoot: a valid target address must be provided");
//        require(_data.length >= 4, "PolygonDAORoot: a valid payload must be provided");

        bytes memory message = abi.encode(_target, _value, _data);
        sendMessageToChild(message);

        emit CallOnChild(msg.sender, _target, _value, bytes4(_data));
    }
}
