const path=require('path');
const fs = require('fs');

const solc =require('solc');

const filepath=path.resolve(__dirname,'contracts','Lottery.sol');

// console.log(filepath);

const source = fs.readFileSync(filepath,"utf8");

// console.log(source);


// console.log(solc.compile(source,1));

// 当有多个合约的时候，打印指定合约（HelloWorld）
// console.log(solc.compile(source,1).contracts[':HelloWorld']);

// 可以让其他文件引用
module.exports = solc.compile(source,1).contracts[':Lottery']
