// SPDX-License-Identifier: MIT
pragma solidity ^0.8.5;

interface IStateSender {
    /**
     * @notice Event emitted when when syncState is called
     * @dev Heimdall bridge listens to this event and sends the data to receiver contract on child chain
     * @param id Id of the sync, increamented for each event in case of actual state sender contract
     * @param contractAddress the contract receiving data on child chain
     * @param data bytes data to be sent
     */
    event StateSynced(
        uint256 indexed id,
        address indexed contractAddress,
        bytes data
    );

    function syncState(address receiver, bytes calldata data) external;
}
