import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lottery from './lottery';


class App extends Component {

  state = {
    manager:'',
    players:[],
    balance:'',
    value:'',
    message:''
  }

  async componentDidMount(){
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);
    console.log(manager);
    this.setState({manager,players,balance});
  }

onSubmit = async event=>{
  event.preventDefault();
  const accounts = await web3.eth.getAccounts();

  this.setState({message:'等待交易完成...'});

  await lottery.methods.enter().send({from:accounts[0],value:web3.utils.toWei(this.state.value,'ether')});
    this.setState({message:'入场成功...'});
}

onClick=async ()=>{
  const accounts = await web3.eth.getAccounts();
  this.setState({message:'等待交易完成...'});
  await lottery.methods.pickWinner().send({from:accounts[0]});
  this.setState({message:'赢家产生...'});
}


  render() {
// console.log(web3.version);
console.log(this.state.value);
    return (

      <div>

      <h1>lottery管理者地址：</h1>

      <p>this is manager by {this.state.manager} </p>
      <p>当前参与者数量：{this.state.players.length}</p>
      <p>当前资金池：{web3.utils.fromWei(this.state.balance,'ether')}</p>
      <hr/>

      <form onSubmit={this.onSubmit}>
        <h4>参与到博彩项目</h4>
        <div>
          <lable>你想参与的金额是多少？</lable>
          <input
            value = {this.state.value}
            onChange={event=>{this.setState({value:event.target.value})}}
          />
        </div>
        <button>提交</button>
      </form>
      <hr/>

      <h4>判断输赢</h4>
      <button onClick={this.onClick}>开始博彩</button>


      <p>{this.state.message}</p>
      </div>
    );
  }
}

export default App;
