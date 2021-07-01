# PolygonTokenHarvester





## Contents
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Globals](#globals)
- [Modifiers](#modifiers)
  - [onlyOnRoot](#onlyonroot)
  - [onlyOnChild](#onlyonchild)
- [Functions](#functions)
  - [initialize](#initialize)
  - [setWithdrawCooldown](#setwithdrawcooldown)
  - [withdrawOnRoot](#withdrawonroot)
  - [transferToOwner](#transfertoowner)
  - [withdrawAndTransferToOwner](#withdrawandtransfertoowner)
  - [withdrawOnChild](#withdrawonchild)
  - [claimAndWithdrawOnChild](#claimandwithdrawonchild)
- [Events](#events)
  - [TransferToOwner](#transfertoowner)
  - [WithdrawOnRoot](#withdrawonroot)
  - [WithdrawOnChild](#withdrawonchild)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Globals

> Note this contains internal vars as well due to a bug in the docgen procedure

| Var | Type |
| --- | :---: |
| rootChainManager | address |
| lastWithdraw | mapping(address => uint256) |
| withdrawCooldown | uint256 |


## Modifiers

### onlyOnRoot
Allows the call only on the root chain

> Checks is based on rootChainManager being set

#### Declaration
```solidity
  modifier onlyOnRoot
```


### onlyOnChild
Allows the call only on the child chain

> Checks is based on rootChainManager being not set

#### Declaration
```solidity
  modifier onlyOnChild
```



## Functions

### initialize
No description


#### Declaration
```solidity
  function initialize(
  ) public
```



### setWithdrawCooldown
Sets the minimum number of blocks that must pass between withdrawals

> This limit is set to not spam the withdrawal process with lots of small withdrawals


#### Declaration
```solidity
  function setWithdrawCooldown(
    uint256 _withdrawCooldown
  ) public
```

#### Args:
| Arg | Type | Description |
| --- | --- | --- |
|`_withdrawCooldown` | uint256 | Number of blocks

### withdrawOnRoot
Withdraws to itself exited funds from Polygon

> Forwards the exit call to the Polygon rootChainManager


#### Declaration
```solidity
  function withdrawOnRoot(
    bytes _data
  ) public returns (bytes)
```

#### Args:
| Arg | Type | Description |
| --- | --- | --- |
|`_data` | bytes | Exit payload created with the Matic SDK

#### Returns:
| Type | Description |
| --- | --- |
|`Bytes` | return of the rootChainManager exit call
### transferToOwner
Transfers full balance of token to owner

> Use this after withdrawOnRoot to transfer what you have exited from Polygon to owner


#### Declaration
```solidity
  function transferToOwner(
    address _token
  ) public
```

#### Args:
| Arg | Type | Description |
| --- | --- | --- |
|`_token` | address | Address of token to transfer

### withdrawAndTransferToOwner
Exit funds from polygon and transfer to owner

> Calls withdrawOnRoot then transferToOwner


#### Declaration
```solidity
  function withdrawAndTransferToOwner(
    bytes _data,
    address _token
  ) public returns (bytes)
```

#### Args:
| Arg | Type | Description |
| --- | --- | --- |
|`_data` | bytes | Exit payload created with the Matic SDK
|`_token` | address | Address of token to transfer

### withdrawOnChild
Withdraws full token balance from the child chain

> Emits WithdrawOnChild on succesful withdraw and burn


#### Declaration
```solidity
  function withdrawOnChild(
    address _childToken
  ) public
```

#### Args:
| Arg | Type | Description |
| --- | --- | --- |
|`_childToken` | address | Address of token to withdraw

### claimAndWithdrawOnChild
Transfer fees from SmartYield and withdraw them from the child chain

> Helper that transfer fees from a SmartYield deployment as underlaying token.


#### Declaration
```solidity
  function claimAndWithdrawOnChild(
    address _syProvider
  ) public
```

#### Args:
| Arg | Type | Description |
| --- | --- | --- |
|`_syProvider` | address | SmartYield deployment address



## Events

### TransferToOwner
No description

  


### WithdrawOnRoot
No description

  


### WithdrawOnChild
No description

  


