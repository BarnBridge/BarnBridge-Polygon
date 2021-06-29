# IERC20Predicate





## Contents
<!-- START doctoc -->
<!-- END doctoc -->




## Functions

### lockTokens
Deposit tokens into pos portal

> When `depositor` deposits tokens into pos portal, tokens get locked into predicate contract.


#### Declaration
```solidity
  function lockTokens(
    address depositor,
    address depositReceiver,
    address rootToken,
    bytes depositData
  ) external
```

#### Args:
| Arg | Type | Description |
| --- | --- | --- |
|`depositor` | address | Address who wants to deposit tokens
|`depositReceiver` | address | Address (address) who wants to receive tokens on side chain
|`rootToken` | address | Token which gets deposited
|`depositData` | bytes | Extra data for deposit (amount for ERC20, token id for ERC721 etc.) [ABI encoded]

### exitTokens
Validates and processes exit while withdraw process

> Validates exit log emitted on sidechain. Reverts if validation fails.
Processes withdraw based on custom logic. Example: transfer ERC20/ERC721, mint ERC721 if mintable withdraw


#### Declaration
```solidity
  function exitTokens(
    address sender,
    address rootToken,
    bytes logRLPList
  ) external
```

#### Args:
| Arg | Type | Description |
| --- | --- | --- |
|`sender` | address | Address
|`rootToken` | address | Token which gets withdrawn
|`logRLPList` | bytes | Valid sidechain log for data like amount, token id etc.



## Events

### LockedERC20
No description



