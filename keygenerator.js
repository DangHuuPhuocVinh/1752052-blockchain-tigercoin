const EC = require('elliptic').ec;
const ec = new EC('secp256k1'); // the algorithm for generating the key

const key = ec.genKeyPair();
const publicKey = key.getPublic('hex');
const privateKey = key.getPrivate('hex');

console.log();
console.log('Private key:', privateKey);

console.log();
console.log('Public key:', publicKey);

//Private key: 80302ea7044c71b167a16b98673a367a53b943a31fdf99a54e7018c1ad0ce2c5

//Public key: 044e485d899433b15d7ae6f90ea4b38ea687fa0298bd4f6fa081f9800f1ead4809ed1845cf69f2ccbadd63a1d6afcb0a80ba7390ff1495982b7433ef2422463389

//Private key: c1bd5c38560f2f501549466b8dd07664abc406a50a09e9c280d58ff0efd5808f

//Public key: 045b77fb397a552dee81f8140787cbb6ed1c586d120720882c27595d5e47fd0ee79fe9d3e642b436bce540ce346cab0f9dabade2f18aae5e7645371aca42045227