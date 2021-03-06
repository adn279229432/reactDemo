pragma solidity ^0.4.23;

contract Lottery{
  address public manager;
  address[] public players;

  constructor()public{
    manager = msg.sender;
  }
  function enter()public payable {
    require(msg.value>0.01 ether);
    players.push(msg.sender);
  }

  function random()public view  returns (uint) {
    /* return uint(keccak256(abi.encodePacked(block.difficulty,now,players))); */
    return uint(keccak256(block.difficulty,now,players));
  }

  modifier restricted() {
    require(msg.sender==manager);
    _;
  }

  function pickWinner()public  payable {
    uint index = random()%players.length;
    players[index].transfer(address(this).balance);
    players = new address[](0);
  }

  function  getPlayers()public view returns(address[]) {
    return players;
  }
}
