import React from 'react';

export default class ChannelMessage extends React.Component {
  constructor() {
    super();
    this.state = { messageData: '', senderAddress: '' };
  }
  async componentDidMount() {
    const messageData = await this.props.drizzle.contracts.DappChat.methods
      .getReplyData(this.props.channelIndex, this.props.messageIndex)
      .call();
    this.setState({
      messageData: messageData[0],
      senderAddress: messageData[1],
    });
  }

  render() {
    const { senderAddress, messageData } = this.state;
    return (
      <div style={{ border: 'solid' }}>
        <h1>Reply</h1>
        <p>From: {senderAddress}</p>
        <p>Reply: {messageData}</p>
      </div>
    );
  }
}
