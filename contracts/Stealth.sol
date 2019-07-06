pragma solidity ^0.5.8;
pragma experimental ABIEncoderV2;


contract Stealth {

    struct ReplyMessage {
        string message;
        address sender;
        string quotedReply;
    }

    struct Channel {
        address channelOwner;
        string channelName;
        string category;
        uint numberOfReplies;
        bool restrictedStatus;
        mapping(address=>bool) members;
        mapping(uint => ReplyMessage) messages;
    }

    struct User {
        string username;
        int[] following;
    }

    Channel[] public allChannels;
    mapping(address => User) public allUsers;
    address[] public addressList;

    //Check if user exists in javascript otherwise createUser
    function createUser(string memory username) public {
        allUsers[msg.sender] = User(username, new int[](0));
        addressList.push(msg.sender);
    }

    function changeUsername(string memory newUsername) public {
        allUsers[msg.sender].username = newUsername;
    }

    //Feed in hashtag from javascript
    function addChannelStruct(string memory channelName, string memory category, bool restrictedStatus) public {
        Channel memory newChannel = Channel({
            channelOwner: msg.sender,
            channelName: channelName,
            category: category,
            numberOfReplies:0,
            restrictedStatus: restrictedStatus
        });

        followChannel(int(allChannels.length));
        allChannels.push(newChannel);
    }

    function toggleChannelRestriction(uint channelIndex) public{
        allChannels[channelIndex].restrictedStatus = !allChannels[channelIndex].restrictedStatus;
    }

    function addChannelMembers(uint channelIndex, address newMember) public {
        require (allChannels[channelIndex].channelOwner == msg.sender);
            allChannels[channelIndex].members[newMember] = true;
    }

    function removeChannelMembers(uint channelIndex, address memberToRemove) public {
        require (allChannels[channelIndex].channelOwner == msg.sender);
            allChannels[channelIndex].members[memberToRemove] = false;
    }

    //While creating tweets we will add button to reply with original address and index
    //
    function addMessage(uint channelIndex, string memory message) public {
        if(allChannels[channelIndex].restrictedStatus == true){
            require(allChannels[channelIndex].members[msg.sender]);
        }

         ReplyMessage memory newMessage = ReplyMessage({
             message: message,
             sender:msg.sender,
             quotedReply: ''
         });

        //Fetch number of replies to current tweet
        uint currReplyIndex = allChannels[channelIndex].numberOfReplies;

        //Appending newReply to end of reply chain
        allChannels[channelIndex].messages[currReplyIndex] = newMessage;


        //Update number of replies
        allChannels[channelIndex].numberOfReplies++;
    }

    //Change to channels instead of user
    function followChannel(int channelIndex) public {
        allUsers[msg.sender].following.push(channelIndex);
    }

    function unfollowChannel(uint indexToUnfollow) public {
        allUsers[msg.sender].following[indexToUnfollow] = -1;
    }

    //need to render different css if sender is different than user
    function quoteMessage(uint channelNumber, uint messageIndex, string memory message) public {
        Channel storage currentChannel = allChannels[channelNumber];

        ReplyMessage memory newReplyMessage = ReplyMessage({
            message: message,
            sender: currentChannel.messages[messageIndex].sender,
            quotedReply: currentChannel.messages[messageIndex]. message
        });

        currentChannel.messages[currentChannel.numberOfReplies] = newReplyMessage;
    }

    function getAllChannelsLength() public view returns (uint) {
        return allChannels.length;
    }

    function getMessage(uint channelIndex, uint messageIndex) public view returns (string memory) {
        return allChannels[channelIndex].messages[messageIndex].message;
    }

    function getReplyData(uint channelIndex, uint messageIndex) public view returns (string memory, address, string memory){
        return (allChannels[channelIndex].messages[messageIndex].message, allChannels[channelIndex].messages[messageIndex].sender,allChannels[channelIndex].messages[messageIndex].quotedReply );
    }

    function getChannelData(uint channelIndex) public view returns (address, string memory, string memory, uint, bool){
        return (allChannels[channelIndex].channelOwner, allChannels[channelIndex].channelName, allChannels[channelIndex].category,allChannels[channelIndex].numberOfReplies, allChannels[channelIndex].restrictedStatus);
    }

    function getUserData(address user) public view returns (string memory, int[] memory){
        return (allUsers[user].username, allUsers[user].following);
    }
}
