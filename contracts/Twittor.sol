pragma solidity ^0.5.8;
pragma experimental ABIEncoderV2;


contract Twittor {

struct ReplyTweet {
    string text;
    address sender;
}    
    
struct Tweet {
        string text;
        string hashtag;
        uint blockNum;
        uint numReplies;
        uint retweetCount;
        address originalCreator;
        mapping(uint => ReplyTweet) replies;
        mapping(uint => address) retweets;
    }
    
struct User {
    address[] following;
    address[] followers;
    uint numTweets;
    mapping(uint => Tweet) allTweets;
}

mapping(address => User) public allUsers;
address[] public keyList;
    
    //Check if user exists in javascript otherwise createUser
    function createUser() public {
        address currAddress = msg.sender;
        allUsers[currAddress] = User(new address[](0), new address[](0), 0);
        keyList.push(currAddress);
    }     
    
    //Feed in hashtag from javascript
    function addTweetStruct(string memory tweet, string memory hashT) public {
        User storage currUser = allUsers[msg.sender];
        uint currTweetCount = currUser.numTweets;
        
        Tweet memory newTweet = Tweet({
            text: tweet,
            hashtag: hashT,
            blockNum: block.number,
            numReplies:0,
            retweetCount: 0,
            originalCreator: msg.sender
        });
        
        currUser.allTweets[currTweetCount] = newTweet;
        currUser.numTweets++;
    }
    
    function getTweetStruct(address user, uint index) public view returns (string memory){
        return allUsers[user].allTweets[index].text;
    }
    
    //While creating tweets we will add button to reply with original address and index
    function addReply(address tweetor, uint index, string memory replyString) public {
         ReplyTweet memory newReply = ReplyTweet({
             text: replyString,
             sender:msg.sender
         });
        
        //Fetch number of replies to current tweet
        uint currReplyIndex = allUsers[tweetor].allTweets[index].numReplies;
        
        //Appending newReply to end of reply chain
        allUsers[tweetor].allTweets[index].replies[currReplyIndex] = newReply;
        
        //Update number of replies
        allUsers[tweetor].allTweets[index].numReplies++;
    }
    
    function followUser(address addressToFollow) public {
        address currAddress = msg.sender;
        allUsers[currAddress].following.push(addressToFollow);
        allUsers[addressToFollow].followers.push(currAddress);
    }
    
    function viewFollowing(address userToCheck,uint index) public view returns (address) {
        return allUsers[userToCheck].following[index];
    }
    
     function viewFollowers(address userToCheck,uint index) public view returns (address) {
        return allUsers[userToCheck].followers[index];
    }
    
    function reTweetStruct(address userToRetweet,uint index) public {
        User storage currUser = allUsers[msg.sender];
        uint currTweetCount = currUser.numTweets;

        Tweet memory newTweet = Tweet({
            text: allUsers[userToRetweet].allTweets[index].text,
            hashtag: allUsers[userToRetweet].allTweets[index].hashtag,
            blockNum: allUsers[userToRetweet].allTweets[index].blockNum,
            numReplies:0,
            retweetCount: 0,
            originalCreator: userToRetweet
        });
        
        currUser.allTweets[currTweetCount] = newTweet;
        currUser.numTweets++;
    }
    
    function getEverythingTweetStruct(address user, uint index) public view returns (string memory, string memory, uint, uint){
        return (allUsers[user].allTweets[index].text, allUsers[user].allTweets[index].hashtag,allUsers[user].allTweets[index].blockNum, allUsers[user].allTweets[index].numReplies);
    }
    

    
    function getReply(address user, uint tweetIndex, uint replyIndex) public view returns (string memory) {
        return allUsers[user].allTweets[tweetIndex].replies[replyIndex].text;
    }


  function getNumTweets(address user) public view returns (uint){
  
    return allUsers[user].numTweets;
  }

   function getNumOfTweetReplies(address user, uint tweetIndex) public view returns (uint){
    return allUsers[user].allTweets[tweetIndex].numReplies;
  }
}
