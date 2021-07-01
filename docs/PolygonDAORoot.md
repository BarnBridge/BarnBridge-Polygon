# PolygonDAORoot


Root chain side of a Polygon data bridge meant to execute commands on the child chain

> This can be used to forward commands given by the DAO to be executed on the child chain

## Contents
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Globals](#globals)
- [Functions](#functions)
  - [constructor](#constructor)
  - [_processMessageFromChild](#_processmessagefromchild)
  - [sendMessageToChild](#sendmessagetochild)
  - [callOnChild](#callonchild)
- [Events](#events)
  - [CallOnChild](#callonchild)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Globals

> Note this contains internal vars as well due to a bug in the docgen procedure

| Var | Type |
| --- | :---: |
| latestData | bytes |



## Functions

### constructor
No description


#### Declaration
```solidity
  function constructor(
  ) public
```



### _processMessageFromChild
No description


#### Declaration
```solidity
  function _processMessageFromChild(
  ) internal
```



### sendMessageToChild
No description


#### Declaration
```solidity
  function sendMessageToChild(
  ) public
```



### callOnChild
No description


#### Declaration
```solidity
  function callOnChild(
  ) public
```





## Events

### CallOnChild
No description

  


