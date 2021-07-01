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
| --- | --- |
| latestData | bytes |



## Functions

### constructor
PolygonDAORoot constructor

> calls FxBaseRootTunnel(_checkpointManager, _fxRoot) 


#### Declaration
```solidity
  function constructor(
    address _checkpointManager,
    address _fxRoot
  ) public FxBaseRootTunnel
```

#### Modifiers:
| Modifier |
| --- |
| FxBaseRootTunnel |

#### Args:
| Arg | Type | Description |
| --- | --- | --- |
|`_checkpointManager` | address | Address of RootChainProxy from https://github.com/maticnetwork/static/tree/master/network
|`_fxRoot` | address | Address of FxStateRootTunnel from https://docs.matic.network/docs/develop/l1-l2-communication/state-transfer/

### _processMessageFromChild
Used to receive message from child chain

> Not currently used


#### Declaration
```solidity
  function _processMessageFromChild(
    bytes _data
  ) internal
```

#### Modifiers:
No modifiers

#### Args:
| Arg | Type | Description |
| --- | --- | --- |
|`_data` | bytes | Data received from child chain

### sendMessageToChild
Sends a payload to be executed on the child chain

> Payload needs to be encoded like abi.encode(_target, _value, _data)


#### Declaration
```solidity
  function sendMessageToChild(
    bytes _message
  ) public onlyOwner
```

#### Modifiers:
| Modifier |
| --- |
| onlyOwner |

#### Args:
| Arg | Type | Description |
| --- | --- | --- |
|`_message` | bytes | payload to execute on the child chain

### callOnChild
Encodes and sends a payload to be executed on the child chain

> This is what you will use most of the time. Emits CallOnChild


#### Declaration
```solidity
  function callOnChild(
    address _target,
    uint256 _value,
    bytes _data
  ) public onlyOwner
```

#### Modifiers:
| Modifier |
| --- |
| onlyOwner |

#### Args:
| Arg | Type | Description |
| --- | --- | --- |
|`_target` | address | Address on child chain against which to execute the tx
|`_value` | uint256 | Value to transfer
|`_data` | bytes | Calldata for the child tx



## Events

### CallOnChild
Logs a call being forwarded to the child chain

> Emitted when callOnChild is called

  

#### Params:
| Param | Type | Indexed | Description |
| --- | --- | :---: | --- |
|`caller` | address | :white_check_mark: | Address that called callOnChild
|`target` | address |  | Target of call on the child chain
|`value` | uint256 |  | Value to transfer on execution
|`sig` | bytes4 |  | Signature of function that will be called
