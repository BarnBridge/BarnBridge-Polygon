// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {IERC20ChildToken} from "../matic/IERC20ChildToken.sol";


contract ERC20ChildTokenMock is ERC20, IERC20ChildToken {
    constructor(string memory _name, string memory _symbol) ERC20(_name, _symbol) {
    }

    function mint(address _account, uint256 _amount) public {
        _mint(_account, _amount);
    }

    function deposit(address _user, bytes calldata _depositData) external override {
        // spoof an amount
        uint amount = 10e18;
        _mint(_user, amount);
    }

    function withdraw(uint256 amount) external override {
        _burn(msg.sender, amount);
    }

}

