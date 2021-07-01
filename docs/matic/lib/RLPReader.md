# RLPReader





## Contents
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Globals](#globals)
- [Functions](#functions)
  - [toRlpItem](#torlpitem)
  - [toList](#tolist)
  - [isList](#islist)
  - [toRlpBytes](#torlpbytes)
  - [toAddress](#toaddress)
  - [toUint](#touint)
  - [toUintStrict](#touintstrict)
  - [toBytes](#tobytes)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Globals

> Note this contains internal vars as well due to a bug in the docgen procedure

| Var | Type |
| --- | --- |
| STRING_SHORT_START | uint8 |
| STRING_LONG_START | uint8 |
| LIST_SHORT_START | uint8 |
| LIST_LONG_START | uint8 |
| WORD_SIZE | uint8 |



## Functions

### toRlpItem
No description


#### Declaration
```solidity
  function toRlpItem(
  ) internal returns (struct RLPReader.RLPItem)
```

#### Modifiers:
No modifiers



### toList
No description


#### Declaration
```solidity
  function toList(
  ) internal returns (struct RLPReader.RLPItem[])
```

#### Modifiers:
No modifiers



### isList
No description


#### Declaration
```solidity
  function isList(
  ) internal returns (bool)
```

#### Modifiers:
No modifiers



### toRlpBytes
RLPItem conversions into data types *


#### Declaration
```solidity
  function toRlpBytes(
  ) internal returns (bytes)
```

#### Modifiers:
No modifiers



### toAddress
No description


#### Declaration
```solidity
  function toAddress(
  ) internal returns (address)
```

#### Modifiers:
No modifiers



### toUint
No description


#### Declaration
```solidity
  function toUint(
  ) internal returns (uint256)
```

#### Modifiers:
No modifiers



### toUintStrict
No description


#### Declaration
```solidity
  function toUintStrict(
  ) internal returns (uint256)
```

#### Modifiers:
No modifiers



### toBytes
No description


#### Declaration
```solidity
  function toBytes(
  ) internal returns (bytes)
```

#### Modifiers:
No modifiers





