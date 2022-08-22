const EC = require('elliptic').ec;
const ec = new EC('secp256k1'); // the algorithm for generating the key

const key = ec.genKeyPair();
const publicKey = key.getPublic('hex');
const privateKey = key.getPrivate('hex');

console.log();
console.log('Private key:', privateKey);

console.log();
console.log('Public key:', publicKey);

// Private key: 5dd6c932b7e2854af12ec7f46993b350467bb6a04766742a992c0f74231113cc

// Public key: 04580a1e6723dd71659888cbec6966ab7d65a2a58fce6bb416bbb2382ed3964804c2712001ee5a99574c6a3707988bf529b84a603eccf9cfa54f716655a4c6478d

// Private key: 6dda38fb90d1650929ac56ab8b51dc62916993898e82febc99fc5a8e6c97dbd6

// Public key: 04a43edecc3d3bd1d9b44a01162394f4d951f30bd7f9fd0e004dd23aac146233cef5e65fd7b2f6bb22272df8f95b3e217a5a8dbfc9b87cee5b0d6527842fb53155