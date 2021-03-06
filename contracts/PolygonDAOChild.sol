// SPDX-License-Identifier: MIT
pragma solidity ^0.8.5;

import "@openzeppelin/contracts/access/Ownable.sol";
import {FxBaseChildTunnel} from "./matic/FxBaseChildTunnel.sol";

/// @title PolygonDAOChild
/// @author Alex T
/// @notice Child chain side of a Polygon data bridge meant to execute commands on the child chain
/// @dev This can be used to execute commands forwarded from the DAO on the root chain
contract PolygonDAOChild is FxBaseChildTunnel {
    uint256 public latestStateId;
    address public latestRootMessageSender;
    bytes public latestData;

    /// @notice PolygonDAOChild constructor
    /// @dev calls FxBaseChildTunnel(_fxChild)
    /// @param _fxChild Address of FxStateChildTunnel from https://docs.matic.network/docs/develop/l1-l2-communication/state-transfer/
    constructor(address _fxChild) FxBaseChildTunnel(_fxChild) {}

    /// @notice Enables contract to receive ETH
    receive() external payable {}

    /// @notice Called when there is a message from the root chain
    /// @dev This executes a DAO command on the child chain
    /// @param _stateId StateId
    /// @param _sender This should be the root chain end of the tunnel
    /// @param _data ABI encoded payload to execute
    function _processMessageFromRoot(
        uint256 _stateId,
        address _sender,
        bytes memory _data
    ) internal override validateSender(_sender) {
        latestStateId = _stateId;
        latestRootMessageSender = _sender;
        latestData = _data;

        (address target, uint256 value, bytes memory payload) = abi.decode(_data, (address, uint256, bytes));

        (bool success, bytes memory result) = target.call{value : value}(payload);
        if (!success) {
            // Next 5 lines from https://ethereum.stackexchange.com/a/83577
            if (result.length < 68) revert();
            assembly {
                result := add(result, 0x04)
            }
            revert(abi.decode(result, (string)));
        }
    }
}

