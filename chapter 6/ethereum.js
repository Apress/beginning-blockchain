var Web3 = require('web3');

// RPC API path of your local geth node
// run the local geth node as described in the chapter 6
var RPC_PATH = "http://127.0.0.1:8545"

// initilize web3 object with the local node path as the provider
var web3 = new Web3(new Web3.providers.HttpProvider(RPC_PATH));

// creates account on the local ethereum geth node using web3.personal module
var createAccount = function () {
    // replace "abcd" with the password of your choice
    web3.eth.personal.newAccount('abcd').then(console.log);
};

// unlocks an account on the local ethereum geth node using web3.personal module
var unlockAccount = function () {
    // use your own account address and password
    web3.eth.personal.unlockAccount('0xbaf735f889d603f0ec6b1030c91d9033e60525c3', 'abcd').then(console.log);
}

// deploys the smart contract for polling dApp as described in chapter 6
// uses the web3.eth.Contract module to deploy the contract
var deployContract = function () {
    var pollingContract = new web3.eth.Contract([{
        "constant": true,
        "inputs": [{
            "name": "",
            "type": "address"
        }],
        "name": "votes",
        "outputs": [{
            "name": "",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getPoll",
        "outputs": [{
            "name": "",
            "type": "string"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [{
            "indexed": false,
            "name": "_voter",
            "type": "address"
        },
        {
            "indexed": false,
            "name": "_value",
            "type": "uint256"
        }
        ],
        "name": "Voted",
        "type": "event"
    },
    {
        "constant": false,
        "inputs": [{
            "name": "selection",
            "type": "uint256"
        }],
        "name": "vote",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
    ]);
    pollingContract
        .deploy({
            data: '0x6060604052608060405190810160405280605081526020017f53686f756c6420636f66666565206265206d6164652074617820667265653f2081526020017f53656e64203120666f7220796573204f52203220666f72206e6f20696e20746881526020017f6520766f74652066756e6374696f6e2e000000000000000000000000000000008152506001908051906020019061009c9291906100ad565b5034156100a857600080fd5b610152565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106100ee57805160ff191683800117855561011c565b8280016001018555821561011c579182015b8281111561011b578251825591602001919060010190610100565b5b509050610129919061012d565b5090565b61014f91905b8082111561014b576000816000905550600101610133565b5090565b90565b610373806101616000396000f300606060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630121b93f1461005c57806303c322781461007f578063d8bff5a51461010d575b600080fd5b341561006757600080fd5b61007d600480803590602001909190505061015a565b005b341561008a57600080fd5b610092610273565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156100d25780820151818401526020810190506100b7565b50505050905090810190601f1680156100ff5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561011857600080fd5b610144600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061031b565b6040518082815260200191505060405180910390f35b7f4d99b957a2bc29a30ebd96a7be8e68fe50a3c701db28a91436490b7d53870ca43382604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a160008060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205414151561021257600080fd5b6000811180156102225750600381105b151561022d57600080fd5b806000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555050565b61027b610333565b60018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156103115780601f106102e657610100808354040283529160200191610311565b820191906000526020600020905b8154815290600101906020018083116102f457829003601f168201915b5050505050905090565b60006020528060005260406000206000915090505481565b6020604051908101604052806000815250905600a165627a7a72305820ec7d3e1dae8412ec85045a8eafc248e37ae506802cc008ead300df1ac81aab490029'
        })
        .send({
            from: '0xbaf735f889d603f0ec6b1030c91d9033e60525c3',
            gas: 4700000,
            gasPrice: '20000000000000'
        },
            function (error, transactionHash) {
                console.log(error);
                console.log(transactionHash);
            })
        .then(function (contract) {
            console.log(contract);
        });
};

// calls the getPoll smart contract function for polling contract as described in chapter 6
// uses the web3.eth.Contract module
var callContractGetPoll = function () {
    var pollingContract = new web3.eth.Contract([{
        "constant": true,
        "inputs": [{
            "name": "",
            "type": "address"
        }],
        "name": "votes",
        "outputs": [{
            "name": "",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getPoll",
        "outputs": [{
            "name": "",
            "type": "string"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [{
            "indexed": false,
            "name": "_voter",
            "type": "address"
        },
        {
            "indexed": false,
            "name": "_value",
            "type": "uint256"
        }
        ],
        "name": "Voted",
        "type": "event"
    },
    {
        "constant": false,
        "inputs": [{
            "name": "selection",
            "type": "uint256"
        }],
        "name": "vote",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
    ], '0x59E7161646C3436DFdF5eBE617B4A172974B481e');

    pollingContract.methods.getPoll().call().then(console.log);
};

// executes the vote smart contract function for polling contract as described in chapter 6
// uses the web3.eth.Contract module
var executeContractVote = function (voteValue = 1) {
    var pollingContract = new web3.eth.Contract([{
        "constant": true,
        "inputs": [{
            "name": "",
            "type": "address"
        }],
        "name": "votes",
        "outputs": [{
            "name": "",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getPoll",
        "outputs": [{
            "name": "",
            "type": "string"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [{
            "indexed": false,
            "name": "_voter",
            "type": "address"
        },
        {
            "indexed": false,
            "name": "_value",
            "type": "uint256"
        }
        ],
        "name": "Voted",
        "type": "event"
    },
    {
        "constant": false,
        "inputs": [{
            "name": "selection",
            "type": "uint256"
        }],
        "name": "vote",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
    ], '0x59E7161646C3436DFdF5eBE617B4A172974B481e');

    pollingContract.methods.vote(voteValue).send({
        from: '0xbaf735f889d603f0ec6b1030c91d9033e60525c3'
    }).then(function (result) {
        console.log(result);
    });
};

// gets all the events for the polling smart contract as described in chapter 6
var getContractEvents = function () {
    var pollingContract = new web3.eth.Contract([{
        "constant": true,
        "inputs": [{
            "name": "",
            "type": "address"
        }],
        "name": "votes",
        "outputs": [{
            "name": "",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getPoll",
        "outputs": [{
            "name": "",
            "type": "string"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [{
            "indexed": false,
            "name": "_voter",
            "type": "address"
        },
        {
            "indexed": false,
            "name": "_value",
            "type": "uint256"
        }
        ],
        "name": "Voted",
        "type": "event"
    },
    {
        "constant": false,
        "inputs": [{
            "name": "selection",
            "type": "uint256"
        }],
        "name": "vote",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
    ], '0x59E7161646C3436DFdF5eBE617B4A172974B481e');

    pollingContract.getPastEvents('allEvents').then(console.log);
};

module.exports = {
    createAccount: createAccount,
    deployContract: deployContract,
    unlockAccount: unlockAccount,
    callContractGetPoll: callContractGetPoll,
    executeContractVote: executeContractVote,
    getContractEvents: getContractEvents
};