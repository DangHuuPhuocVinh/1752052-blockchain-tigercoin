const {Blockchain, Transaction} = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const mykey = ec.keyFromPrivate('80302ea7044c71b167a16b98673a367a53b943a31fdf99a54e7018c1ad0ce2c5');
const mywallet = mykey.getPublic('hex');    

let tigerCoin = new Blockchain();

const tx1 = new Transaction(mywallet, '044e485d899433b15d7ae6f90ea4b38ea687fa0298bd4f6fa081f9800f1ead4809ed1845cf69f2ccbadd63a1d6afcb0a80ba7390ff1495982b7433ef2422463389', 100);
tx1.signTransaction(mykey);
tigerCoin.addTransaction(tx1);



// tigerCoin.createTransaction(new Transaction('address1', 'tiger', '100'));

console.log('\n Starting the miner.');
tigerCoin.minePendingTransactions(mywallet);

console.log('\n My balance is', tigerCoin.getBalanceOfAddress(mywallet));

// tigerCoin.createTransaction(new Transaction('tiger', 'address1', '50'));

// console.log('\n Starting the miner second.');

// console.log('\n My balance is', tigerCoin.getBalanceOfAddress('tiger'));





// console.log('Mining block 1...');
// tigerCoin.addBlock(new Block(1, "12/6/2022", { amount:4 }));

// console.log('Mining block 2...');
// tigerCoin.addBlock(new Block(2, "15/6/2022", { amount:10 }));

// console.log('Mining block 3...');
// tigerCoin.addBlock(new Block(3, "16/6/2022", { amount:12 }));

// console.log('Mining block 4...');
// tigerCoin.addBlock(new Block(4, "18/6/2022", { amount:5 }));

//console.log(JSON.stringify(tigerCoin, null, 4));

// console.log('Is blockchain valid ?' + tigerCoin.isChainValid());

// tigerCoin.chain[1].data = { amount: 200 };
// tigerCoin.chain[1].hash = tigerCoin.chain[1].calculateHash();

// console.log('Is blockchain valid ?' + tigerCoin.isChainValid());


