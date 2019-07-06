import React from 'react';

export default class ChannelMessage extends React.Component {
  constructor(props) {
    super();
    this.state = { messageData: '' };
  }
  async componentDidMount() {
    const messageData = await this.props.drizzle.contracts.Stealth.methods
      .getReplyData(this.props.channelIndex, this.props.messageIndex)
      .call();
    this.setState({ messageData: messageData[0] });
  }

  render() {
    return (
      <div style={{ border: 'solid' }}>
        <h1>Reply</h1>
        <p>From: {this.props.userAddress}</p>
        <p>Reply:{this.state.messageData}</p>
      </div>
    );
  }
}
