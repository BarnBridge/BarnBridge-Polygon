# RLPReader





## Contents
<!-- START doctoc -->
<!-- END doctoc -->

## Variables:

### STRING_SHORT_START
No description


#### Type
```solidity
uint8
```

### STRING_LONG_START
No description


#### Type
```solidity
uint8
```

### LIST_SHORT_START
No description


#### Type
```solidity
uint8
```

### LIST_LONG_START
No description


#### Type
```solidity
uint8
```

### WORD_SIZE
No description


#### Type
```solidity
uint8
```




## Functions

### toRlpItem
No description


#### Declaration
```solidity
  function toRlpItem(
  ) internal returns (struct RLPReader.RLPItem)
```



### toList
No description


#### Declaration
```solidity
  function toList(
  ) internal returns (struct RLPReader.RLPItem[])
```



### isList
No description


#### Declaration
```solidity
  function isList(
  ) internal returns (bool)
```



### toRlpBytes
RLPItem conversions into data types *


#### Declaration
```solidity
  function toRlpBytes(
  ) internal returns (bytes)
```



### toAddress
No description


#### Declaration
```solidity
  function toAddress(
  ) internal returns (address)
```



### toUint
No description


#### Declaration
```solidity
  function toUint(
  ) internal returns (uint256)
```



### toUintStrict
No description


#### Declaration
```solidity
  function toUintStrict(
  ) internal returns (uint256)
```



### toBytes
No description


#### Declaration
```solidity
  function toBytes(
  ) internal returns (bytes)
```





