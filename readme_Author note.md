# Beginning Blockchain - Source Code

This file describes how to use this source code package for the Beginning Blockchain book.

## Contents

1. This source code package contains source code for chapters 5 and 6 of the book.
2. All code is JavaScript with an exception of HTML/CSS for calling smart contract code in chapter 6
3. The JavaScript files are wrapped inside a **nodejs** application which is represented by the `package.json` file in the root of this directory.
4. All required node module (packages) are listed in the `dependencies` section of the `package.json` file

## Directory structure

All concepts covered in chapters 5 and 6 which have source code involved, have the corresponding source code in this package.
This package's root directory is structure with it's contents as below,
* `package.json` (as described above)
* `index.js` as an entry point for the nodejs application
* directory for chapter 5 code
* directory for chapter 6 code

The **chapter 5** directory has two JavaScript files, `bitcoin.js` and `ethereum.js` each for Bitcoin and Ethereum code.  
The **chapter 6** directory has just one JavaScript file, `ethereum.js`, as all the code in chapter 6 is for Ethereum dApp development.  
The JavaScript files in the directories have code divided into functions for each concept.  
All functions have comments describing the code written in them.  

## How to execute

A basic understanding of JavaScript and nodejs is expected from the reader.

For every function to execute,
* include the corresponding JavaScript file using the `require` statement in the `index.js`
* call the function inside the default function of `index.js`.  

> In the following code snippet, we are calling the `getKeys` function inside the `bitcoin.js` of chapter 5 directory.

```
var btc = require('./chapter 5/bitcoin');

(function(){
    btc.getKeys();
})();
```

> Similarly, in the following code snippet, we are calling the `createAccounts` function inside the `ethereum.js` of chapter 6 directory.

```
var eth = require('./chapter 6/ethereum');

(function(){
    eth.createAccounts();
})();
```