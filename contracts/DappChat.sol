pragma solidity ^0.5.8;
pragma experimental ABIEncoderV2;


contract DappChat {
    struct ReplyMessage {
        string message;
        address sender;
        string quotedReply;
        uint blockTimestamp;
    }

    struct Channel {
        address channelOwner;
        string channelName;
        string category;
        uint numberOfReplies;
        bool restrictedStatus;
        //we want a mapping because of fast lookup and slow write
        address[] membersArray;
        mapping(address=>bool) members;
        mapping(uint => ReplyMessage) messages;
    }

    Channel[] public allChannels;
    mapping(address => string) public aliases;
    mapping(address => int[]) followedChannels;

    //Create or set alias
    function setAlias(string memory username) public {
        aliases[msg.sender] = username;
    }

    //Create new addChannelStruct
    function addChannelStruct(string memory channelName, string memory category, bool restrictedStatus) public {

        Channel memory newChannel = Channel({
            channelOwner: msg.sender,
            channelName: channelName,
            category: category,
            numberOfReplies:0,
            restrictedStatus: restrictedStatus,
            membersArray: new address[](0)
        });



        //Follows your own channel
        followedChannels[msg.sender].push(int(allChannels.length));
        allChannels.push(newChannel);

        //add yourself to your own allowed members
        allChannels[allChannels.length - 1].members[msg.sender] = true;
        allChannels[allChannels.length - 1].membersArray.push(msg.sender);
    }

    function toggleChannelRestriction(uint channelIndex) public{
        allChannels[channelIndex].restrictedStatus = !allChannels[channelIndex].restrictedStatus;
    }

    function addChannelMembers(uint channelIndex, address newMember) public {
        require (allChannels[channelIndex].channelOwner == msg.sender);
            allChannels[channelIndex].members[newMember] = true;
            allChannels[channelIndex].membersArray.push(newMember);
    }

    function removeChannelMembers(uint channelIndex, address memberToRemove, uint memberIndex) public {
        require (allChannels[channelIndex].channelOwner == msg.sender);
            allChannels[channelIndex].members[memberToRemove] = false;
            delete allChannels[channelIndex].membersArray[memberIndex];
    }

    //While creating tweets we will add button to reply with original address and index
    function addMessage(uint channelIndex, string memory message) public {
        if(allChannels[channelIndex].restrictedStatus == true){
            require(allChannels[channelIndex].members[msg.sender]);
        }

         ReplyMessage memory newMessage = ReplyMessage({
             message: message,
             sender:msg.sender,
             quotedReply: '',
             blockTimestamp: block.timestamp
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
        followedChannels[msg.sender].push(channelIndex);
    }

    function unfollowChannel(uint indexToUnfollow) public {
        followedChannels[msg.sender][indexToUnfollow] = -1;
    }

    //need to render different css if sender is different than user
    function quoteMessage(uint channelNumber, uint messageIndex, string memory message) public {
        Channel storage currentChannel = allChannels[channelNumber];

        ReplyMessage memory newReplyMessage = ReplyMessage({
            message: message,
            sender: currentChannel.messages[messageIndex].sender,
            quotedReply: currentChannel.messages[messageIndex]. message,
            blockTimestamp: block.timestamp
        });

        currentChannel.messages[currentChannel.numberOfReplies] = newReplyMessage;
    }

    function getAllChannelsLength() public view returns (uint) {
        return allChannels.length;
    }

    function getMessage(uint channelIndex, uint messageIndex) public view returns (string memory) {
        return allChannels[channelIndex].messages[messageIndex].message;
    }

    function getReplyData(uint channelIndex, uint messageIndex) public view returns (string memory, address, string memory, uint){
        return (allChannels[channelIndex].messages[messageIndex].message, allChannels[channelIndex].messages[messageIndex].sender,allChannels[channelIndex].messages[messageIndex].quotedReply, allChannels[channelIndex].messages[messageIndex].blockTimestamp );
    }

    function getChannelData(uint channelIndex) public view returns (address, string memory, string memory, uint, bool){
        return (allChannels[channelIndex].channelOwner, allChannels[channelIndex].channelName, allChannels[channelIndex].category,allChannels[channelIndex].numberOfReplies, allChannels[channelIndex].restrictedStatus);
    }

    function getFollowedChannels() public view returns (int[] memory) {
        return followedChannels[msg.sender];
    }

    function getMembersArray(uint channelIndex) public view returns (address[] memory) {
        return allChannels[channelIndex].membersArray;
    }

}

