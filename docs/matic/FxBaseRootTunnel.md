# FxBaseRootTunnel





## Contents
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Globals](#globals)
- [Functions](#functions)
  - [constructor](#constructor)
  - [setFxChildTunnel](#setfxchildtunnel)
  - [_sendMessageToChild](#_sendmessagetochild)
  - [_validateAndExtractMessage](#_validateandextractmessage)
  - [receiveMessage](#receivemessage)
  - [_processMessageFromChild](#_processmessagefromchild)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Globals

> Note this contains internal vars as well due to a bug in the docgen

| Var | Type |
| --- | :---: |
| SEND_MESSAGE_EVENT_SIG | bytes32 |
| fxRoot | contract IFxStateSender |
| checkpointManager | contract ICheckpointManager |
| fxChildTunnel | address |
| processedExits | mapping(bytes32 => bool) |



## Functions

### constructor
No description


#### Declaration
```solidity
  function constructor(
  ) internal
```



### setFxChildTunnel
No description


#### Declaration
```solidity
  function setFxChildTunnel(
  ) public
```



### _sendMessageToChild
Send bytes message to Child Tunnel



#### Declaration
```solidity
  function _sendMessageToChild(
    bytes message
  ) internal
```

#### Args:
| Arg | Type | Description |
| --- | --- | --- |
|`message` | bytes | bytes message that will be sent to Child Tunnel
some message examples -
  abi.encode(tokenId);
  abi.encode(tokenId, tokenMetadata);
  abi.encode(messageType, messageData);

### _validateAndExtractMessage
No description


#### Declaration
```solidity
  function _validateAndExtractMessage(
  ) internal returns (bytes)
```



### receiveMessage
receive message from  L2 to L1, validated by proof

> This function verifies if the transaction actually happened on child chain



#### Declaration
```solidity
  function receiveMessage(
    bytes inputData
  ) public
```

#### Args:
| Arg | Type | Description |
| --- | --- | --- |
|`inputData` | bytes | RLP encoded data of the reference tx containing following list of fields
 0 - headerNumber - Checkpoint header block number containing the reference tx
 1 - blockProof - Proof that the block header (in the child chain) is a leaf in the submitted merkle root
 2 - blockNumber - Block number containing the reference tx on child chain
 3 - blockTime - Reference tx block time
 4 - txRoot - Transactions root of block
 5 - receiptRoot - Receipts root of block
 6 - receipt - Receipt of the reference transaction
 7 - receiptProof - Merkle proof of the reference receipt
 8 - branchMask - 32 bits denoting the path of receipt in merkle tree
 9 - receiptLogIndex - Log Index to read from the receipt

### _processMessageFromChild
Process message received from Child Tunnel

> function needs to be implemented to handle message as per requirement
This is called by onStateReceive function.
Since it is called via a system call, any event will not be emitted during its execution.


#### Declaration
```solidity
  function _processMessageFromChild(
    bytes message
  ) internal
```

#### Args:
| Arg | Type | Description |
| --- | --- | --- |
|`message` | bytes | bytes message that was sent from Child Tunnel



