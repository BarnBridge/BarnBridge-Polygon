// SPDX-License-Identifier: MIT
pragma solidity ^0.8.5;

import {PolygonDAOChild} from "./PolygonDAOChild.sol";

contract PolygonDAOChildTest is PolygonDAOChild {
    constructor(address _fxChild) PolygonDAOChild(_fxChild) {}

    function processMessageFromRootTest(
        uint256 stateId,
        address sender,
        bytes memory data
    ) public {
        _processMessageFromRoot(stateId, sender, data);
    }
}
