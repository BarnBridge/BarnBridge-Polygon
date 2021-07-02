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

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Globals

> Note this contains internal vars as well due to a bug in the docgen procedure

| Var | Type |
| --- | --- |
| latestStateId | uint256 |
| latestRootMessageSender | address |
| latestData | bytes |



## Functions

### constructor
PolygonDAOChild constructor

> calls FxBaseChildTunnel(_fxChild)


#### Declaration
```solidity
  function constructor(
    address _fxChild
  ) public FxBaseChildTunnel
```

#### Modifiers:
| Modifier |
| --- |
| FxBaseChildTunnel |

#### Args:
| Arg | Type | Description |
| --- | --- | --- |
|`_fxChild` | address | Address of FxStateChildTunnel from https://docs.matic.network/docs/develop/l1-l2-communication/state-transfer/

### receive
Enables contract to receive ETH


#### Declaration
```solidity
  function receive(
  ) external
```

#### Modifiers:
No modifiers



### _processMessageFromRoot
Called when there is a message from the root chain

> This executes a DAO command on the child chain


#### Declaration
```solidity
  function _processMessageFromRoot(
    uint256 _stateId,
    address _sender,
    bytes _data
  ) internal validateSender
```

#### Modifiers:
| Modifier |
| --- |
| validateSender |

#### Args:
| Arg | Type | Description |
| --- | --- | --- |
|`_stateId` | uint256 | StateId
|`_sender` | address | This should be the root chain end of the tunnel
|`_data` | bytes | ABI encoded payload to execute



