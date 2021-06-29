# PolygonCommunityVault


Assists with moving a specified token from the root chain to the child chain. Made for Polygon

> It needs to be deployed at the same address on both chains. Uses CREATE2 on deploy to achieve that

## Functions

### `initialize(address _token, address _rootChainManager, address _erc20Predicate)` (public)
Needs to be called after deployment. Get addresses from https://github.com/maticnetwork/static/tree/master/network


#### Parameters:
- `_token`: The address of the ERC20 that the vault will manipulate/own

- `_rootChainManager`: Polygon root network chain manager. Zero address for child deployment

- `_erc20Predicate`: Polygon ERC20 Predicate. Zero address for child deployment

### initialize
PolygonCommunityVault initializer

> Needs to be called after deployment. Get addresses from https://github.com/maticnetwork/static/tree/master/network


```solidity
  function initialize(
    address _token, // The address of the ERC20 that the vault will manipulate/own
    address _rootChainManager, // Polygon root network chain manager. Zero address for child deployment
    address _erc20Predicate // Polygon ERC20 Predicate. Zero address for child deployment
  ) public
```

### `setAllowance(address spender, uint256 amount)` (public)
No description


### setAllowance
No description


```solidity
  function setAllowance(

  ) public
```

### `transferToChild()` (public)
No description


### transferToChild
No description


```solidity
  function transferToChild(

  ) public
```



## Events

### `SetAllowance(address caller, address spender, uint256 amount)`
No description

### `TransferToChild(address caller, address token, uint256 amount)`
No description

