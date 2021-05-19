// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./matic/IRootChainManager.sol";

contract PolygonCommunityVault is Ownable {
    IERC20 private _bond;
    IRootChainManager _rootChainManager;
    address _erc20Predicate;

    constructor (address bond, address rootChainManager, address erc20Predicate) {
        _bond = IERC20(bond);
        
        if (rootChainManager != address(0)) {
            require(erc20Predicate != address(0), "if root chain manager is set, erc20 predicate must not be 0x0");

            _erc20Predicate = erc20Predicate;
            _rootChainManager = IRootChainManager(rootChainManager);
        }
    }

    event SetAllowance(address indexed caller, address indexed spender, uint256 amount);

    function setAllowance(address spender, uint amount) public onlyOwner {
        _bond.approve(spender, amount);

        emit SetAllowance(msg.sender, spender, amount);
    }

    // -----
    // TODO need to discuss if public or onlyOwner
    function depositToken(address token) public {
        require(token != address(0), "token to be deposited must be specified");
        require(_erc20Predicate != address(0), "deposit to polygon not enabled on this vault");

        uint256 amount = IERC20(token).balanceOf(address(this));
        IERC20(token).approve(_erc20Predicate, amount);
        _rootChainManager.depositFor(address(this), token, abi.encode(amount));
    }

}
