pragma solidity ^0.4.23;

contract HelloWorld{
  string public name;

  constructor(string _name)public{
    name =_name;
  }

  function getName()public view  returns(string){
    return name;
  }
  function changeName(string _name)public{
    name=_name;

  }
}
