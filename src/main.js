const {Blockchain, Transaction} = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const mykey = ec.keyFromPrivate('3986d8df9b5c42655ef636cac235799dcb64a593dd7a23afae9d1471d59a7721');
const mywallet = mykey.getPublic('hex');    

let tigerCoin = new Blockchain();

const tx1 = new Transaction(mywallet, '04fa86db4f8a460172da4240f1093a2bc4a13a64e4ca1ed24953cd6f44c6a34c48b8b196904791a152fba9d20ba84a98bf6267dafe3b864694426e2defabf8b600', 100);
tx1.signTransaction(mykey);
tigerCoin.addTransaction(tx1);

console.log('\n Starting the miner.');
tigerCoin.minePendingTransactions(mywallet);


console.log('\n My balance is', tigerCoin.getBalanceOfAddress(mywallet));



