const {Blockchain, Transaction} = require('./blockchain');


let tigerCoin = new Blockchain();
tigerCoin.createTransaction(new Transaction('address1', 'tiger', '100'));

console.log('\n Starting the miner.');
tigerCoin.minePendingTransactions('tiger');

console.log('\n My balance is', tigerCoin.getBalanceOfAddress('tiger'));

tigerCoin.createTransaction(new Transaction('tiger', 'address1', '50'));

console.log('\n Starting the miner second.');

console.log('\n My balance is', tigerCoin.getBalanceOfAddress('tiger'));





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


