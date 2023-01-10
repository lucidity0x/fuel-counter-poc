const { Wallet } = require("fuels");

const wallet = Wallet.generate();

console.log("address", wallet.address.toString());
console.log("private key", wallet.privateKey);

//address fuel126e3c30awjhv6vs4k2cdjtpl69vf26ffgd9u5vhldvjnzcn6lp5qkly9vg
//private key 0xab5a4dd74f058134e4bd5699391af43d1c09f3a08bd215864b95a7eb0184a573

