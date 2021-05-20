// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./matic/IRootChainManager.sol";

contract PolygonCommunityVault is OwnableUpgradeable {
    IERC20 private _token;
    IRootChainManager _rootChainManager;
    address _erc20Predicate;

    event SetAllowance(address indexed caller, address indexed spender, uint256 amount);

    function initialize(address token, address rootChainManager, address erc20Predicate) initializer public {
        require(token != address(0), "a valid token address must be provided");

        __Ownable_init();

        _token = IERC20(token);

        if (rootChainManager != address(0)) {
            require(erc20Predicate != address(0), "if root chain manager is set, erc20 predicate must not be 0x0");

            _erc20Predicate = erc20Predicate;
            _rootChainManager = IRootChainManager(rootChainManager);
        }
     }

    function setAllowance(address spender, uint amount) public onlyOwner {
        _token.approve(spender, amount);

        emit SetAllowance(msg.sender, spender, amount);
    }

    // TODO need to discuss if public or onlyOwner
    function sendToPolygon() public {
        require(_erc20Predicate != address(0), "deposit to polygon must be enabled enabled on this vault");

        uint256 amount =_token.balanceOf(address(this));
        _token.approve(_erc20Predicate, amount);
        _rootChainManager.depositFor(address(this), address(_token), abi.encode(amount));
    }

}
