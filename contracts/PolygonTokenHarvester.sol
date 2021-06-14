// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

import "./ISmartYieldProvider.sol";
import "./matic/IRootChainManager.sol";
import "./matic/IERC20ChildToken.sol";

contract PolygonTokenHarvester is OwnableUpgradeable {
    using SafeERC20 for IERC20;

    bool private _onRootChain;

    address public rootChainManager;
    mapping(address => uint) public lastWithdraw;
    uint public withdrawCooldown;

    event SetAllowance(address indexed caller, address indexed spender, uint256 amount);
    event TransferToOwner(address indexed caller, address indexed owner, address indexed token, uint256 amount);
    event WithdrawOnRoot(address indexed caller);
    event WithdrawOnChild(address indexed caller, address indexed token, uint256 amount);

    function initialize(uint _withdrawCooldown, address _rootChainManager) initializer public {
        __Ownable_init();

        setWithdrawCooldown(_withdrawCooldown);

        if (_rootChainManager != address(0)) {
            _onRootChain = true;
            rootChainManager = _rootChainManager;
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

    function setWithdrawCooldown(uint _withdrawCooldown) public onlyOwner onlyOnChild {
        withdrawCooldown = _withdrawCooldown;
    }

    // Root Chain Related Functions
    function withdrawOnRoot(bytes memory _data) public onlyOnRoot returns (bytes memory) {
        //        (bool success, bytes memory returnData) = IRootChainManager(rootChainManager).exit(_data);
        (bool success, bytes memory returnData) = rootChainManager.call(_data);
        require(success, string(returnData));

        emit WithdrawOnRoot(_msgSender());

        return returnData;
    }

    function transferToOwner(address _token) public onlyOnRoot {
        require(_token != address(0), "Harvester: token address must be specified");

        IERC20 erc20 = IERC20(_token);

        address owner = owner();

        uint256 amount = erc20.balanceOf(address(this));
        erc20.safeTransfer(owner, amount);

        emit TransferToOwner(_msgSender(), owner, _token, amount);
    }

    // Child Chain Related Functions
    function withdrawOnChild(address _childToken) public onlyOnChild {
        require(_childToken != address(0), "Harvester: child token address must be specified");

        // if cooldown has not passed, we just skip it
        if (block.number < lastWithdraw[_childToken] + withdrawCooldown) {
            return;
        }
        lastWithdraw[_childToken] = block.number;

        IERC20ChildToken erc20 = IERC20ChildToken(_childToken);

        uint256 amount = erc20.balanceOf(address(this));
        erc20.withdraw(amount);

        emit WithdrawOnChild(_msgSender(), _childToken, amount);
    }

    function claimAndWithdrawOnChild(address _syProvider) public onlyOnChild {
        require(_syProvider != address(0), "Harvester: sy provider address must not be 0x0");

        ISmartYieldProvider provider = ISmartYieldProvider(_syProvider);
        address underlying = provider.uToken();

        provider.transferFees();
        withdrawOnChild(underlying);
    }
}
