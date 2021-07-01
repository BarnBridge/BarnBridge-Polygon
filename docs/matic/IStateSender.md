# IStateSender





## Contents
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Functions](#functions)
  - [syncState](#syncstate)
- [Events](#events)
  - [StateSynced](#statesynced)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->




## Functions

### syncState
No description


#### Declaration
```solidity
  function syncState(
  ) external
```

#### Modifiers:
No modifiers





## Events

### StateSynced
Event emitted when when syncState is called

> Heimdall bridge listens to this event and sends the data to receiver contract on child chain

  

#### Params:
| Param | Type | Indexed | Description |
| --- | --- | :---: | --- |
|`id` | uint256 | :white_check_mark: | Id of the sync, increamented for each event in case of actual state sender contract
|`contractAddress` | address | :white_check_mark: | the contract receiving data on child chain
|`data` | bytes |  | bytes data to be sent
