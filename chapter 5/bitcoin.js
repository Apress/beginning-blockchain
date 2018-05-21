var btc = require('bitcoinjs-lib');
var request = require('request');

// set network for the bitcoinjs library
// documentation - https://github.com/bitcoinjs/bitcoinjs-lib/blob/master/test/integration/addresses.js#L121
var network = btc.networks.testnet;

// set endpoint for block explorer public API
var blockExplorerTestnetApiEndpoint = 'https://testnet.blockexplorer.com/api/';

// generate two bitcoin addresses using the bitcoinjs library
var getKeys = function () {
    var aliceKeys = btc.ECPair.makeRandom({
        network: network
    });
    var bobKeys = btc.ECPair.makeRandom({
        network: network
    });

    var alicePublic = aliceKeys.getAddress();
    var alicePrivate = aliceKeys.toWIF();

    var bobPublic = bobKeys.getAddress();
    var bobPrivate = bobKeys.toWIF();

    console.log(alicePublic, alicePrivate, bobPublic, bobPrivate);
};

// gets the outputs for a bitcoin adderss
var getOutputs = function (address) {
    var url = blockExplorerTestnetApiEndpoint + 'addr/' + address + '/utxo';
    return new Promise(function (resolve, reject) {
        request.get(url, function (err, res, body) {
            if (err) {
                reject(err);
            }
            resolve(body);
        });
    });
};

// creates, signs and sends a bitcoin testnet transaction
var createTransaction = function () {

    // use your own generated addresses when running this code
    var alice = btc.ECPair.fromWIF('cQQhHcH6C7A9VNFtGdwaSwNDRpNHDfYrPc3XnS9Puz4HHU4axM2z', network);
    var bob = btc.ECPair.fromWIF('cW1MB2G86LqJ9sy8cUeuxotmuaU5LyMMZffvpaFxbUw144dj1QpP', network);

    getOutputs(alice.getAddress()).then(function (res) {
        var utxo = JSON.parse(res.toString());
        console.log(utxo);

        // make sure that the addresses you are using have enough bitcoins...
        // for this transaction to go through
        var transaction = new btc.TransactionBuilder(network);
        transaction.addInput(utxo[0].txid, utxo[0].vout);
        transaction.addOutput(alice.getAddress(), 99992000);
        transaction.sign(0, bob);
        var transactionHex = transaction.build().toHex();

        var txPushUrl = blockExplorerTestnetApiEndpoint + 'tx/send';
        request.post({
            url: txPushUrl,
            json: {
                rawtx: transactionHex
            }
        }, function (err, res, body) {
            if (err) console.log(err);

            console.log(res);
            console.log(body);
        });
    });
};

module.exports = {
    getKeys: getKeys,
    createTransaction: createTransaction
};