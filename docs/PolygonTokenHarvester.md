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
  - [SetAllowance](#setallowance)
  - [TransferToOwner](#transfertoowner)
  - [WithdrawOnRoot](#withdrawonroot)
  - [WithdrawOnChild](#withdrawonchild)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Globals

> Note this contains internal vars as well due to a bug in the docgen

| Var | Type |
| --- | :---: |
| rootChainManager | address |
| lastWithdraw | mapping(address => uint256) |
| withdrawCooldown | uint256 |


## Modifiers

### onlyOnRoot
Allows the call only on the root chain

> Checks if rootChainManager is set and only then allows the call

#### Declaration
```solidity
  modifier onlyOnRoot
```


### onlyOnChild
No description


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
No description


#### Declaration
```solidity
  function setWithdrawCooldown(
  ) public
```



### withdrawOnRoot
No description


#### Declaration
```solidity
  function withdrawOnRoot(
  ) public returns (bytes)
```



### transferToOwner
No description


#### Declaration
```solidity
  function transferToOwner(
  ) public
```



### withdrawAndTransferToOwner
No description


#### Declaration
```solidity
  function withdrawAndTransferToOwner(
  ) public returns (bytes)
```



### withdrawOnChild
No description


#### Declaration
```solidity
  function withdrawOnChild(
  ) public
```



### claimAndWithdrawOnChild
No description


#### Declaration
```solidity
  function claimAndWithdrawOnChild(
  ) public
```





## Events

### SetAllowance
No description

  


### TransferToOwner
No description

  


### WithdrawOnRoot
No description

  


### WithdrawOnChild
No description

  


