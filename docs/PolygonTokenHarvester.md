# PolygonTokenHarvester





## Contents
<!-- START doctoc -->
<!-- END doctoc -->

## Variables:

### rootChainManager
No description


#### Type
```solidity
address
```

### lastWithdraw
No description


#### Type
```solidity
mapping(address => uint256)
```

### withdrawCooldown
No description


#### Type
```solidity
uint256
```



## Modifiers

### onlyOnRoot
No description


### onlyOnChild
No description



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



