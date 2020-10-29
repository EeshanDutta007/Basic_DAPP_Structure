// SPDX-License-Identifier: RANDOM_TEXT
pragma solidity ^0.7.4;

contract inbox{
    string public message;

    constructor(string memory initialMessage) {
        message = initialMessage;
    }

    function setMessage(string memory newMessage) public {
        message = newMessage;
    }
}
