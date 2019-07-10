import React from 'react';
import makeBlockie from 'ethereum-blockies-base64';

const msgLength = 45;

export default class ChannelsInHome extends React.Component {
  constructor(props) {
    super();

    this.state = {
      channel: '',
      numOfMessagesInChannel: '',
      lastMessageInChannel: '',
      lastMessageSender: '',
      lastMessageTime: '',
      activeIndex: false,

      loading: false,
      errorMessage: '',
      displayReply: false,
      loadingData: true,
    };
  }
  async componentDidMount() {
    const channelData = await this.props.drizzle.contracts.DappChat.methods
      .getChannelData(this.props.channelIndex)
      .call();
    this.props.drizzle.contracts.DappChat.methods.getChannelData.cacheCall(
      this.props.channelIndex
    );

    const lastMessage = await this.props.drizzle.contracts.DappChat.methods
      .getReplyData(this.props.channelIndex, channelData[3] - 1)
      .call();
    let time = '';
    if (lastMessage[3] !== '0') {
      const date = new Date(lastMessage[3] * 1000);
      // time = `${date.getFullYear()} ${date.getMonth()} ${date.getDay()} ${date.getHours()}:${date.getMinutes()}`;

      time = `${date.getHours()}:${date.getMinutes()}`;
    }

    this.setState({
      channel: channelData[1],
      numOfMessagesInChannel: channelData[3],
      lastMessageInChannel: lastMessage[0],
      lastMessageSender: lastMessage[1],
      lastMessageTime: time,
    });
  }

  render() {
    const { lastMessageInChannel } = this.state;
    return (
      <div>
        <div className="singleChannel">
          <div className="profilePhoto">
            {this.state.lastMessageSender ? (
              <img
                alt="blockie"
                className="blockies"
                src={makeBlockie(this.state.lastMessageSender)}
              />
            ) : (
              ''
            )}
          </div>

          <div className="channelNameAndMessage">
            <div className="channelNameAndTime">
              <div>{this.state.channel}</div>
              <div>{this.state.lastMessageTime}</div>
            </div>

            {lastMessageInChannel.length > msgLength
              ? lastMessageInChannel.slice(0, msgLength) + '...'
              : lastMessageInChannel}
          </div>
        </div>
      </div>
    );
  }
}
