# PolygonCommunityVault


Assists with moving a specified token from the root chain to the child chain. Made for Polygon

> It needs to be deployed at the same address on both chains. Uses CREATE2 on deploy to achieve that

## Functions

### initialize
PolygonCommunityVault initializer

> Needs to be called after deployment. Get addresses from https://github.com/maticnetwork/static/tree/master/network


#### Declaration
```solidity
  function initialize(
    address _token,
    address _rootChainManager,
    address _erc20Predicate
  ) public
```

#### Parameters:
- `_token`: The address of the ERC20 that the vault will manipulate/own
- `_rootChainManager`: Polygon root network chain manager. Zero address for child deployment
- `_erc20Predicate`: Polygon ERC20 Predicate. Zero address for child deployment

#### Args:
| Arg | Type | Description |
| --- | --- | --- |
|`_token` | address | The address of the ERC20 that the vault will manipulate/own
|`_rootChainManager` | address | Polygon root network chain manager. Zero address for child deployment
|`_erc20Predicate` | address | Polygon ERC20 Predicate. Zero address for child deployment

### setAllowance
No description


#### Declaration
```solidity
  function setAllowance(
  ) public
```





### transferToChild
No description


#### Declaration
```solidity
  function transferToChild(
  ) public
```







## Events

### `SetAllowance(address caller, address spender, uint256 amount)`
No description

### `TransferToChild(address caller, address token, uint256 amount)`
No description

