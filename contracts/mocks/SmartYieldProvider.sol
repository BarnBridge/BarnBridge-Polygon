// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.4;
pragma abicoder v2;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract SmartYieldProvider {
    // underlying token (ie. DAI)
    address public uToken; // IERC20
    address public feesOwner;

    event TransferFees(address indexed caller, address indexed feesOwner, uint256 fees);

    constructor(address _uToken) {
        uToken = _uToken;
    }

    function setFeesOwner(address _feesOwner) external {
        feesOwner = _feesOwner;
    }

    function transferFees() external {
        uint256 fees = IERC20(uToken).balanceOf(address(this));

        IERC20(uToken).transfer(feesOwner, fees);

        emit TransferFees(msg.sender, feesOwner, fees);
    }
}
