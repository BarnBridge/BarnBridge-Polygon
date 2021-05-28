// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./matic/IRootChainManager.sol";
import "./matic/IERC20ChildToken.sol";

contract TokenHarvester is OwnableUpgradeable {
    IRootChainManager rootChainManager;
    bool private _onRootChain;

    event SetAllowance(address indexed caller, address indexed spender, uint256 amount);
    event TransferToOwner(address indexed caller,  address indexed owner, address indexed token,  uint256 amount);
    event WithdrawOnRoot(address indexed caller);
    event WithdrawOnChild(address indexed caller, address indexed token,  uint256 amount);

    function initialize(address _rootChainManager) initializer public {
        __Ownable_init();

        if (_rootChainManager != address(0)) {
            _onRootChain = true;
            rootChainManager = IRootChainManager(_rootChainManager);
        } else {
            _onRootChain = false;
        }
     }

    modifier onlyOnRoot {
        require(
            _onRootChain == true,
            "Harvester: should only be called on root chain"
        );
        _;
    }

    modifier onlyOnChild {
        require(
            _onRootChain == false,
            "Harvester: should only be called on child chain"
        );
        _;
    }

    // Layer 1 related functions
    function withdrawOnRoot(bytes memory _data) public onlyOnRoot {
        rootChainManager.exit(_data);

        emit WithdrawOnRoot(_msgSender());
    }

    function transferToOwner(address _token) public onlyOnRoot {
        require(_token != address(0), "Harvester: token address must be specified");

        IERC20 erc20 = IERC20(_token);

        address owner = OwnableUpgradeable.owner();

        uint256 amount = erc20.balanceOf(address(this));
        erc20.transfer(owner, amount);

        emit TransferToOwner(_msgSender(), owner, _token, amount);
    }

    // Layer 2 related functions
    function withdrawOnChild(address _childToken) public onlyOnChild {
        require(_childToken != address(0), "Harvester: child token address must be specified");

        IERC20ChildToken erc20 = IERC20ChildToken(_childToken);

        uint256 amount = erc20.balanceOf(address(this));
        erc20.withdraw(amount);

        emit WithdrawOnChild(_msgSender(), _childToken, amount);
    }
}
