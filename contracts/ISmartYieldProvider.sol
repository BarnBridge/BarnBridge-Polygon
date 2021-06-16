// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.4;
pragma abicoder v2;

interface ISmartYieldProvider {
    function uToken() view external returns (address);
    function transferFees() external;
}
