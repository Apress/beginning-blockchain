var Web3 = require('web3');

var INFURA_API_PATH = 'https://ropsten.infura.io/<your infura API key>';

// initilize web3 object with the infura API path as the provider
var web3 = new Web3(new Web3.providers.HttpProvider(INFURA_API_PATH));

// creates two ethereum accounts (key pairs) using the web3.js library
var createAccounts = function () {
    var aliceKeys = web3.eth.accounts.create();
    console.log(aliceKeys);

    var bobKeys = web3.eth.accounts.create();
    console.log(JSON.stringify(bobKeys));
};

// gets the balance of an ethereum account
var getBalance = function () {
    // use your own generated account address
    web3.eth.getBalance('0xAff9d328E8181aE831Bc426347949EB7946A88DA').then(console.log);
};

// creates, signs and sends a ethereum transaction
var sendTransaction = function () {
    // use your own generated account address
    // make sure that the addresses you are using have enough ether...
    // for this transaction to go through
    var tx = {
        from: "0xc976080893e6783c871c09e9454fee13bc625107",
        gasPrice: "200",
        gas: "4200",
        to: '0x22013fff98c2909bbFCcdABb411D3715fDB341eA',
        value: "10000",
        data: ""
    };

    // use the private key of the "from" address
    web3.eth.accounts.signTransaction(tx, '0x9fb71152b32cb90982f95e2b1bf2a5b6b2a53855eacf59d132a2b7f043cfddf5')
        .then(function (signedTx) {
            console.log(signedTx);
            web3.eth.sendSignedTransaction(signedTx.rawTransaction)
                .then(console.log);
        });
};

// gets the receipt of an ethereum transaction
var getTransaction = function () {
    // use your own transaction hash
    web3.eth.getTransactionReceipt('0xd7291ed42b716cd244f3c4fd52c90ddcc75d57413177409a6ca329c7a2d5df70').then(console.log);
}

// gets all the events for a ethereum smart contract
var getContractEvents = function () {
    // use the ABI and the address of your smart contract
    var helloworldContract = new web3.eth.Contract([{
        "constant": true,
        "inputs": [],
        "name": "Hello",
        "outputs": [{
            "name": "",
            "type": "string"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    }], '0xd5a2d13723A34522EF79bE0f1E7806E86a4578E9'); // this is the contract address

    helloworldContract.getPastEvents('allEvents').then(console.log)
}

// deploys a ethereum smart contract using an ethereum raw transaction
var createContractUsingRawTransaction = function () {
    // use your own generated account address
    // make sure that the addresses you are using have enough ether...
    // for this transaction to go through
    // the data field has the byte code for the smart contract
    var tx = {
        from: "0xF68b93AE6120aF1e2311b30055976d62D7dBf531",
        gasPrice: "20000000000",
        gas: "4900000",
        data: "0x6060604052341561000f57600080fd5b6040805190810160405280600c81526020017f48656c6c6f20576f726c642100000000000000000000000000000000000000008152506000908051906020019061005a929190610060565b50610105565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106100a157805160ff19168380011785556100cf565b828001600101855582156100cf579182015b828111156100ce5782518255916020019190600101906100b3565b5b5090506100dc91906100e0565b5090565b61010291905b808211156100fe5760008160009055506001016100e6565b5090565b90565b6101bc806101146000396000f300606060405260043610610041576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063bcdfe0d514610046575b600080fd5b341561005157600080fd5b6100596100d4565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561009957808201518184015260208101905061007e565b50505050905090810190601f1680156100c65780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6100dc61017c565b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156101725780601f1061014757610100808354040283529160200191610172565b820191906000526020600020905b81548152906001019060200180831161015557829003601f168201915b5050505050905090565b6020604051908101604052806000815250905600a165627a7a72305820877a5da4f7e05c4ad9b45dd10fb6c133a523541ed06db6dd31d59b35d51768a30029"
    };

    // use the private key of the "from" address
    web3.eth.accounts.signTransaction(tx, '0xc6676b7262dab1a3a28a781c77110b63ab8cd5eae2a5a828ba3b1ad28e9f5a9b')
        .then(function (signedTx) {
            web3.eth.sendSignedTransaction(signedTx.rawTransaction)
                .then(console.log);
        });
}

// deploys a ethereum smart contract using web3.eth.contract module
var createContract = function () {
    // use the ABI of your smart contract
    var helloworldContract = new web3.eth.Contract([{
        "constant": true,
        "inputs": [],
        "name": "Hello",
        "outputs": [{
            "name": "",
            "type": "string"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    }]);

    // the data field has the byte code for the smart contract
    helloworldContract
        .deploy({
            data: '0x6060604052341561000f57600080fd5b6040805190810160405280600c81526020017f48656c6c6f20576f726c642100000000000000000000000000000000000000008152506000908051906020019061005a929190610060565b50610105565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106100a157805160ff19168380011785556100cf565b828001600101855582156100cf579182015b828111156100ce5782518255916020019190600101906100b3565b5b5090506100dc91906100e0565b5090565b61010291905b808211156100fe5760008160009055506001016100e6565b5090565b90565b6101bc806101146000396000f300606060405260043610610041576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063bcdfe0d514610046575b600080fd5b341561005157600080fd5b6100596100d4565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561009957808201518184015260208101905061007e565b50505050905090810190601f1680156100c65780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6100dc61017c565b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156101725780601f1061014757610100808354040283529160200191610172565b820191906000526020600020905b81548152906001019060200180831161015557829003601f168201915b5050505050905090565b6020604051908101604052806000815250905600a165627a7a72305820877a5da4f7e05c4ad9b45dd10fb6c133a523541ed06db6dd31d59b35d51768a30029'
        })
        .send({
            from: '0xF68b93AE6120aF1e2311b30055976d62D7dBf531',
            gas: 4700000,
            gasPrice: '20000000000'
        },
            function (error, transactionHash) {
                console.log(error);
                console.log(transactionHash);
            })
        .then(function (contract) {
            console.log(contract);
        });
};

// calls/executes a ethereum smart contract function
var callContract = function () {
    // use the ABI and the address of your smart contract
    var helloworldContract = new web3.eth.Contract([{
        "constant": true,
        "inputs": [],
        "name": "Hello",
        "outputs": [{
            "name": "",
            "type": "string"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    }], '0xd5a2d13723A34522EF79bE0f1E7806E86a4578E9'); // this is the contract address

    helloworldContract.methods.Hello().send({
        from: '0xF68b93AE6120aF1e2311b30055976d62D7dBf531'
    }).then(console.log);
};

module.exports = {
    createAccounts: createAccounts,
    getBalance: getBalance,
    sendTransaction: sendTransaction,
    createContract: createContract,
    getTransaction: getTransaction,
    callContract: callContract,
    getContractEvents: getContractEvents,
    createContractUsingRawTransaction: createContractUsingRawTransaction
};