const SHA256 = require('crypto-js/sha256');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1'); 

class Transaction{
    constructor(fromAddress, toAddress, amount){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }

    calculateHash(){
        return SHA256(this.fromAddress + this.toAddress + this.amount).toString();
    }

    signTransaction(signingKey){
        if(signingKey.getPublic('hex') !== this.fromAddress){
            throw new Error('You cannot sign transaction for other wallets !');
        }

        const hashTX = this.calculateHash();
        const sig = signingKey.sign(hashTX, 'base64');
        this.signature = sig.toDER('hex');
    }

    isValid(){
        if(this.fromAddress === null){
            return true;
        }

        if(!this.signature || this.signature.length === 0){
            throw new Error('No signature in this transaction');
        }

        const publicKey = ec.keyFromPublic(this.fromAddress, 'hex');
        return publicKey.verify(this.calculateHash(), this.signature);
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
        return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString();
    }

    mineBlock(difficulty){
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log("Block mine: " + this.hash);
    }

    hasValidTransactions(){
            for(const tx of this.transactions){
                if(!tx.isValid()){
                    return false;
                }
            }

            return true;
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

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    minePendingTransactions(miningRewardAddress){
        let block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash);
        block.mineBlock(this.difficulty);

        console.log("Block successfully mined !");
        this.chain.push(block);

        this.pendingTransactions[new Transaction(null, miningRewardAddress, this.miningReward)];
    
    }

    addTransaction(transaction){
        if(!transaction.fromAddress || !transaction.toAddress){
            throw new Error('Transaction must include from and to address');
        }

        if(!transaction.isValid()){
            throw new Error('Cannot add invalid transaction to chain');
        }

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
        
        balance = Number(balance);
        
        return balance += this.miningReward; 
    }

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if(!currentBlock.hasValidTransactions()){
                return false;
            }

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

module.exports.Blockchain = Blockchain;
module.exports.Transaction = Transaction;

// let tigerCoin = new Blockchain();


// console.log('Mining block ...');
// tigerCoin.addBlock(new Block(1, "12/6/2022", { amount:4 }));

// console.log('Mining block 2...');
// tigerCoin.addBlock(new Block(2, "15/6/2022", { amount:10 }));

// console.log('Mining block 3...');
// tigerCoin.addBlock(new Block(3, "16/6/2022", { amount:12 }));

// console.log('Mining block 4...');
// tigerCoin.addBlock(new Block(4, "18/6/2022", { amount:5 }));



// console.log('\n Starting the miner.');
// tigerCoin.minePendingTransactions(mywallet);



//tigerCoin.createTransaction(new Transaction('tiger', 'address1', '50'));

// console.log('\n Starting the miner second.');

// console.log('\n My balance is', tigerCoin.getBalanceOfAddress('tiger'));


// console.log(JSON.stringify(tigerCoin, null, 4));

// console.log('Is blockchain valid ?' + tigerCoin.isChainValid());

// tigerCoin.chain[1].data = { amount: 200 };
// tigerCoin.chain[1].hash = tigerCoin.chain[1].calculateHash();

// console.log('Is blockchain valid ?' + tigerCoin.isChainValid());