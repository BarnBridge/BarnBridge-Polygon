# PolygonCommunityVault


Assists with moving a specified token from the root chain to the child chain. Made for Polygon

> It needs to be deployed at the same address on both chains. Uses CREATE2 on deploy to achieve that

## Contents
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Globals](#globals)
- [Functions](#functions)
  - [initialize](#initialize)
  - [setAllowance](#setallowance)
  - [transferToChild](#transfertochild)
- [Events](#events)
  - [SetAllowance](#setallowance)
  - [TransferToChild](#transfertochild)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Globals

> Note this contains internal vars as well due to a bug in the docgen procedure

| Var | Type |
| --- | :---: |
| rootChainManager | contract IRootChainManager |
| erc20Predicate | address |
| token | address |



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

#### Args:
| Arg | Type | Description |
| --- | --- | --- |
|`_token` | address | The address of the ERC20 that the vault will manipulate/own
|`_rootChainManager` | address | Polygon root network chain manager. Zero address for child deployment
|`_erc20Predicate` | address | Polygon ERC20 Predicate. Zero address for child deployment

### setAllowance
Sets Allowance for specified contract for the managed token

> Emits SetAllowance on allowance being successfully set


#### Declaration
```solidity
  function setAllowance(
    address _spender,
    uint256 _amount
  ) public
```

#### Args:
| Arg | Type | Description |
| --- | --- | --- |
|`_spender` | address | Address that is allowed to spend the funds
|`_amount` | uint256 | How much cand the address spend

### transferToChild
Transfers full balance of managed token through the Polygon Bridge

> Emits TransferToChild on funds being sucessfuly deposited

#### Declaration
```solidity
  function transferToChild(
  ) public
```





## Events

### SetAllowance
Notifies of allowance being set

> Emitted when setAlowance is called

  

#### Params:
| Param | Type | Indexed | Description |
| --- | :---: | :---: | --- |
|`caller` | address | :white_check_mark: | Address that called setAllowance
|`spender` | address | :white_check_mark: | Address that the allowance has been set for
|`amount` | uint256 |  | The amount of tokens that spender can spend
### TransferToChild
Notifies of a transfer to the child chain being made

> Emitted when transferToChild is called

  

#### Params:
| Param | Type | Indexed | Description |
| --- | :---: | :---: | --- |
|`caller` | address | :white_check_mark: | Address that called transferToChild
|`token` | address | :white_check_mark: | Address of the transferred token
|`amount` | uint256 |  | The amount of tokens that were sent to the child chain
