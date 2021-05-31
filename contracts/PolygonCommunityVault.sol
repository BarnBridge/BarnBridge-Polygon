// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

import "./matic/IRootChainManager.sol";

contract PolygonCommunityVault is OwnableUpgradeable {
    using SafeERC20 for IERC20;

    IRootChainManager internal rootChainManager;
    address internal erc20Predicate;

    address public token;

    event SetAllowance(address indexed caller, address indexed spender, uint256 amount);
    event TransferToChild(address indexed caller, address indexed token,  uint256 amount);

    function initialize(address _token, address _rootChainManager, address _erc20Predicate)  public initializer {
        require(_token != address(0), "Vault: a valid token address must be provided");

        __Ownable_init();

        token = _token;

        if (_rootChainManager != address(0)) {
            require(_erc20Predicate != address(0), "Vault: erc20Predicate must not be 0x0");

            erc20Predicate = _erc20Predicate;
            rootChainManager = IRootChainManager(_rootChainManager);
        }
     }

    function setAllowance(address spender, uint amount) public onlyOwner {
        IERC20(token).safeApprove(spender, amount);

        emit SetAllowance(msg.sender, spender, amount);
    }

    function transferToChild() public { // onlyOnRoot , maybe onlyOwner
        require(erc20Predicate != address(0), "Vault: transfer to child chain is disabled");

        IERC20 erc20 = IERC20(token);

        uint256 amount = erc20.balanceOf(address(this));
        erc20.safeApprove(erc20Predicate, amount);
        rootChainManager.depositFor(address(this), token, abi.encode(amount));

        emit TransferToChild(msg.sender, token, amount);
    }

}
