# FxBaseChildTunnel


Mock child tunnel contract to receive and send message from L2


## Contents
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Globals](#globals)
- [Modifiers](#modifiers)
  - [validateSender](#validatesender)
- [Functions](#functions)
  - [constructor](#constructor)
  - [setFxRootTunnel](#setfxroottunnel)
  - [processMessageFromRoot](#processmessagefromroot)
  - [_sendMessageToRoot](#_sendmessagetoroot)
  - [_processMessageFromRoot](#_processmessagefromroot)
- [Events](#events)
  - [MessageSent](#messagesent)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Globals

> Note this contains internal vars as well due to a bug in the docgen procedure

| Var | Type |
| --- | :---: |
| fxChild | address |
| fxRootTunnel | address |


## Modifiers

### validateSender
No description


#### Declaration
```solidity
  modifier validateSender
```



## Functions

### constructor
No description


#### Declaration
```solidity
  function constructor(
  ) internal
```



### setFxRootTunnel
No description


#### Declaration
```solidity
  function setFxRootTunnel(
  ) public
```



### processMessageFromRoot
No description


#### Declaration
```solidity
  function processMessageFromRoot(
  ) public
```



### _sendMessageToRoot
Emit message that can be received on Root Tunnel

> Call the internal function when need to emit message


#### Declaration
```solidity
  function _sendMessageToRoot(
    bytes message
  ) internal
```

#### Args:
| Arg | Type | Description |
| --- | --- | --- |
|`message` | bytes | bytes message that will be sent to Root Tunnel
some message examples -
  abi.encode(tokenId);
  abi.encode(tokenId, tokenMetadata);
  abi.encode(messageType, messageData);

### _processMessageFromRoot
Process message received from Root Tunnel

> function needs to be implemented to handle message as per requirement
This is called by onStateReceive function.
Since it is called via a system call, any event will not be emitted during its execution.


#### Declaration
```solidity
  function _processMessageFromRoot(
    uint256 stateId,
    address sender,
    bytes message
  ) internal
```

#### Args:
| Arg | Type | Description |
| --- | --- | --- |
|`stateId` | uint256 | unique state id
|`sender` | address | root message sender
|`message` | bytes | bytes message that was sent from Root Tunnel



## Events

### MessageSent
No description

  


