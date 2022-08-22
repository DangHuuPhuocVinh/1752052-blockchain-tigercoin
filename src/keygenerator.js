const EC = require('elliptic').ec;
const ec = new EC('secp256k1'); // the algorithm for generating the key

const key = ec.genKeyPair();
const publicKey = key.getPublic('hex');
const privateKey = key.getPrivate('hex');

console.log();
console.log('Private key:', privateKey);

console.log();
console.log('Public key:', publicKey);

// Private key: 3986d8df9b5c42655ef636cac235799dcb64a593dd7a23afae9d1471d59a7721

// Public key: 040617a638cfacd5f2f01eb058b5839de681aefd1af4dffdd4e736485bf66e4337d3d0e0aa1c5896f31fb172dcc213a9c46a0dbd0750698538c04eb2498c860aec

// Private key: 4e57602955857f559aa6d5f7255ab03f9758ea5d3ce497c91f464e26199b1454

// Public key: 04fa86db4f8a460172da4240f1093a2bc4a13a64e4ca1ed24953cd6f44c6a34c48b8b196904791a152fba9d20ba84a98bf6267dafe3b864694426e2defabf8b600