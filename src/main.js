const {Blockchain, Transaction} = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const mykey = ec.keyFromPrivate('5dd6c932b7e2854af12ec7f46993b350467bb6a04766742a992c0f74231113cc');
const mywallet = mykey.getPublic('hex');    

// let tigerCoin = new Blockchain();

// const tx1 = new Transaction(mywallet, '04a43edecc3d3bd1d9b44a01162394f4d951f30bd7f9fd0e004dd23aac146233cef5e65fd7b2f6bb22272df8f95b3e217a5a8dbfc9b87cee5b0d6527842fb53155', 100);
// tx1.signTransaction(mykey);
// tigerCoin.addTransaction(tx1);

//console.log('\n Starting the miner.');
//tigerCoin.minePendingTransactions(mywallet);


//console.log('\n My balance is', tigerCoin.getBalanceOfAddress(mywallet));



