# IStateSender





## Contents
<!-- START doctoc -->
<!-- END doctoc -->




## Functions

### syncState
No description


#### Declaration
```solidity
  function syncState(
  ) external
```





## Events

### StateSynced
Event emitted when when syncState is called

> Heimdall bridge listens to this event and sends the data to receiver contract on child chain


#### Params:
| Param | Type | Description |
| --- | --- | --- |
|`id` | uint256 | Id of the sync, increamented for each event in case of actual state sender contract
|`contractAddress` | address | the contract receiving data on child chain
|`data` | bytes | bytes data to be sent
