// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./matic/IRootChainManager.sol";
import "./matic/IERC20ChildToken.sol";

contract TokenHarvester is OwnableUpgradeable {
    IRootChainManager rootChainManager;
    bool private _layer2;

    event SetAllowance(address indexed caller, address indexed spender, uint256 amount);
    event TransferToOwner(address indexed caller,  address indexed owner, address indexed token,  uint256 amount);
    event WithdrawLayer1(address indexed caller);
    event WithdrawLayer2(address indexed caller, address indexed token,  uint256 amount);

    function initialize(address _rootChainManager) initializer public {
        __Ownable_init();

        if (_rootChainManager != address(0)) {
            _layer2 = false;
            rootChainManager = IRootChainManager(_rootChainManager);
        } else {
            _layer2 = true;
        }
     }

    modifier onlyLayer1 {
        require(
            _layer2 == false,
            "Harvester: should only be called on layer 1"
        );
        _;
    }

    modifier onlyLayer2 {
        require(
            _layer2 == true,
            "Harvester: should only be called on layer 2"
        );
        _;
    }

    // Layer 1 related functions
    function withdrawOnLayer1(bytes memory _data) public onlyLayer1 {
        rootChainManager.exit(_data);

        emit WithdrawLayer1(_msgSender());
    }

    function transferToOwner(address _token) public onlyLayer1 {
        require(_token != address(0), "Harvester: token address must be specified");

        IERC20 erc20 = IERC20(_token);

        address owner = OwnableUpgradeable.owner();

        uint256 amount = erc20.balanceOf(address(this));
        erc20.transfer(owner, amount);

        emit TransferToOwner(_msgSender(), owner, _token, amount);
    }

    // Layer 2 related functions
    function withdrawOnLayer2(address _childToken) public onlyLayer2 {
        require(_childToken != address(0), "Harvester: child token address must be specified");

        IERC20ChildToken erc20 = IERC20ChildToken(_childToken);

        uint256 amount = erc20.balanceOf(address(this));
        erc20.withdraw(amount);

        emit WithdrawLayer2(_msgSender(), _childToken, amount);
    }
}
