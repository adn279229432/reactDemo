const ganache = require('ganache-cli');//ganache会默认生成很多账户

const Web3 = require('web3');

const web3 = new Web3(ganache.provider());

// const HelloWorld = require('../compile');// HelloWorld.bytecode HelloWorld.interface
// 上面这种方式获取bytecode、interface太笨重，下面的方式就很完美
const {bytecode,interface} = require('../compile');

const assert = require('assert');



var helloworld;

var fetchAccounts;

// async代表异步， beforeEach是跨文件的，任何it函数都会调用beforeEach
beforeEach(async()=>{
  //await 代表同步操作
  fetchAccounts = await web3.eth.getAccounts();//本操作是远程调用，返回promise，把账户们返回

  // interface是字符串但不是json格式，需要转换。send()函数中需要指定msg.sender，gas就是gaslimit
  helloworld =await new web3.eth.Contract(JSON.parse(interface)).deploy({data:bytecode,arguments:['DNA']}).send({from:fetchAccounts[0],gas:'1000000'});

    // console.log(fetchAccounts);


// promise
});

describe('HelloWorld',()=>{
  it('deploy contract',()=>{

      // console.log(helloworld);

      //判断对象是否为空，有对象true，无对象false
      assert.ok(helloworld.options.address);

  })

  it('call static function',async ()=>{
    const message =await helloworld.methods.getName().call();//不需要gas的函数可用call()
    assert.equal('DNA',message);

  })

  it('call dynamic function',async ()=>{
    await helloworld.methods.changeName('LML').send({from:fetchAccounts[0]});
    const message =await helloworld.methods.getName().call();//不需要gas的函数可用call()
    assert.equal('LML',message);

  })


})
