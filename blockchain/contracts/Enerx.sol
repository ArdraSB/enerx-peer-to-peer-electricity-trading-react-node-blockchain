// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

contract Enerx{
  struct Offer{
    address public_address;
    int256 quantity;
    string price;
  }
  event EnergyTraded(address seller, address buyer, int256 quantity);
  event MoneySent(address indexed from, address indexed to, uint256 amount);

  mapping(address=>uint256) private offerIndex;
  mapping(address=>bool) public offerExist;
  mapping(address=>int256) public energyTraded;
  Offer[] private offerList;

  
  function createOffer(int256 quantity,string memory price) public {
  //1. check the seller offer is already exists
    require(!offerExist[msg.sender],"offer already exists");
  //2.add offer to array
    offerList.push(Offer(msg.sender,quantity,price)); 
  //3.track position to find
    offerIndex[msg.sender]=offerList.length-1;
    offerExist[msg.sender]=true;

  }
  function getBalance() view public returns(int256){
    return energyTraded[msg.sender];
  }
  function get()view public returns (address,int256,string memory){
    uint256 index=offerIndex[msg.sender];
    Offer memory user = offerList[index];
    return (msg.sender,user.quantity, user.price);
  }
  function getAllOffers() public view returns (Offer[] memory){
       return offerList;
    }
  function sendMoney(address payable seller,int256 quantity) public payable{
    //1.sending money to seller
        seller.transfer(msg.value);
    //2.find position of the offer
        uint256 index=offerIndex[seller];
    //3.update offer
        offerList[index].quantity-=quantity;
    //4.update energy of buyer
        energyTraded[msg.sender]+=quantity;
    //5.update energy of seller
        energyTraded[seller]-=quantity;
    //6.check the offer depleted
        if(offerList[index].quantity==0){
    //7.replace the offer with last element
          uint256 lastIndex=offerList.length-1;
          offerList[index]=offerList[lastIndex];
    //8.update position of element
          offerIndex[offerList[index].public_address]=index;
          delete offerIndex[seller];
          delete offerExist[seller];
          offerList.pop();
        }
        emit EnergyTraded(seller,msg.sender,quantity);
        emit MoneySent(msg.sender,seller, msg.value);

  }
}
