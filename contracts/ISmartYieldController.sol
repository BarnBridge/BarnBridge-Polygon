// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.4;
pragma abicoder v2;

interface ISmartYieldController {
    function feesOwner() view external returns (address);
    function setFeesOwner(address) external;
}

