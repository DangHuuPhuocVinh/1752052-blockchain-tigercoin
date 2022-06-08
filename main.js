const SHA256 = require('crypto-js/sha256');

class Transaction{
    constructor(fromAddress, toAddress, amount){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}
class Block{
    constructor(timestamp, transactions, previousHash = ''){
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    mineBlock(difficulty){
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log("Block mine: " + this.hash);
    }
}

class Blockchain{
    constructor(){
        this.chain=[this.createGenesisBlock()];
        this.difficulty = 4;
        this.pendingTransactions = [];
        this.miningReward = 10;
    }

    createGenesisBlock(){
        return new Block("7/6/2022", "Genesis block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    // addBlock(newBlock){
    //     newBlock.previousHash = this.getLatestBlock().hash;
    //     newBlock.mineBlock(this.difficulty);
    //     this.chain.push(newBlock);
    // }

    minePendingTransactions(miningRewardAddress){
        let block = new Block(Date.now(), this.pendingTransactions);
        block.mineBlock(this.difficulty);

        console.log("Block successfully mined !");
        this.chain.push(block);

        this.pendingTransactions[new Transaction(null, miningRewardAddress, this.miningReward)];
    
    }

    createTransaction(transaction){
        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(address){
        let balance = 0;

        for(const block of this.chain){
            for(const trans of block.transactions){
                if(trans.fromAddress === address){
                    balance -= trans.amount;
                }

                if(trans.toAddress === address){
                    balance += trans.amount;
                }
            }
        }

        //console.log('getBalanceOfAddress: %s', balance);

        return balance;
    }

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }

        return true;
    }
}

let tigerCoin = new Blockchain();
tigerCoin.createTransaction(new Transaction('address1', 'tiger', '100'));
tigerCoin.createTransaction(new Transaction('address2', 'address1', '50'));

console.log('\n Starting the miner.');
tigerCoin.minePendingTransactions('tiger');

console.log('\n My balance is', tigerCoin.getBalanceOfAddress('tiger'));

console.log('\n Starting the second time.');
tigerCoin.minePendingTransactions('tiger');

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


