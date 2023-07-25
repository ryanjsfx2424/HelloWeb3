// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Greeter {
    // scopes:
    //   public - most gas; anyone can call public (contract function can use)
    //   external - just outside the contract can use
    //   internal
    //   private - least gas
    // Which uses the most gas? Least?
    // Why use public vs external? (What circumstances?)
    string public greeting = "hello web3!";
    
    // add a setter function, scope external
}