const SHA256 = require('crypto-js/sha256');
class Block{
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = '';
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain{
    constructor(){
        this.chain=[this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(0, "7/6/2022", "Genesis block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
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
tigerCoin.addBlock(new Block(1, "12/6/2022", { amount:4 }));
tigerCoin.addBlock(new Block(2, "15/6/2022", { amount:10 }));
tigerCoin.addBlock(new Block(3, "16/6/2022", { amount:12 }));
tigerCoin.addBlock(new Block(4, "18/6/2022", { amount:5 }));

console.log(JSON.stringify(tigerCoin, null, 4));

console.log('Is blockchain valid ?' + tigerCoin.isChainValid());

tigerCoin.chain[1].data = { amount: 200 };
tigerCoin.chain[1].hash = tigerCoin.chain[1].calculateHash();

console.log('Is blockchain valid ?' + tigerCoin.isChainValid());


