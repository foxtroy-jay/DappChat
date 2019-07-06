pragma solidity ^0.5.8;
pragma experimental ABIEncoderV2;


contract DappChat {

mapping(address => string[]) private tweets;
address[] private keyList;
event Tweet(string _message);


  constructor() public {
  }

  function getMessageLength() public view returns (uint){
      return tweets[msg.sender].length;
  }

  function setMessage(string memory newMessage) public {
    if(tweets[msg.sender].length == 0){
        keyList.push(msg.sender);
    }

    tweets[msg.sender].push(newMessage);
    emit Tweet("Tweet sent successfully");
  }

  function getMessageByIndex(uint index) external view returns (string memory) {
    return tweets[msg.sender][index];
  }

  function fetchUserTweets(address user) public view returns (string[] memory) {
    return tweets[user];
  }

  function getKeys() public view returns (address[] memory) {
        return keyList;

  }
}
