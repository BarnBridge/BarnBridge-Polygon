# PolygonDAOChild


Child chain side of a Polygon data bridge meant to execute commands on the child chain

> This can be used to execute commands forwarded from the DAO on the root chain

## Contents
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Globals](#globals)
- [Functions](#functions)
  - [constructor](#constructor)
  - [receive](#receive)
  - [_processMessageFromRoot](#_processmessagefromroot)
  - [sendMessageToRoot](#sendmessagetoroot)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Globals

> Note this contains internal vars as well due to a bug in the docgen procedure

| Var | Type |
| --- | :---: |
| latestStateId | uint256 |
| latestRootMessageSender | address |
| latestData | bytes |



## Functions

### constructor
No description


#### Declaration
```solidity
  function constructor(
  ) public
```



### receive
No description


#### Declaration
```solidity
  function receive(
  ) external
```



### _processMessageFromRoot
No description


#### Declaration
```solidity
  function _processMessageFromRoot(
  ) internal
```



### sendMessageToRoot
No description


#### Declaration
```solidity
  function sendMessageToRoot(
  ) public
```





