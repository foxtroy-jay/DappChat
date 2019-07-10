import React from 'react';
import makeBlockie from 'ethereum-blockies-base64';
import { Popup } from 'semantic-ui-react';
import { send } from 'q';

export default class ChannelMessage extends React.Component {
  constructor(props) {
    super();
    this.state = {
      messageData: '',
      senderAddress: '',
      timeStamp: '',
      messageAuthorAlias: '',
    };
  }
  async componentDidMount() {
    const messageData = await this.props.drizzle.contracts.DappChat.methods
      .getReplyData(this.props.channelIndex, this.props.messageIndex)
      .call();

    const messageAuthorAlias = await this.props.drizzle.contracts.DappChat.methods.aliases(messageData[1]);
    console.log(messageData[1]);
    this.setState({
      messageData: messageData[0],
      senderAddress: messageData[1],
      timeStamp: messageData[3],
      // messageAuthorAlias
    });
    this.props.drizzle.contracts.DappChat.methods.getMessage.cacheCall(
      this.props.channelIndex,
      this.props.messageIndex,
    );
  }

  render() {
    let timeStamp;
    if (this.state.timeStamp) {
      const date = new Date(this.state.timeStamp * 1000);
      timeStamp = (
        <p className="timeStamp">
          {date.getHours()}:{date.getMinutes()}
        </p>
      );
    }
    let blockie;
    if (this.state.senderAddress) {
      blockie = (
        <Popup
          content={this.state.senderAddress}
          flowing
          hoverable
          trigger={<img alt="blockie" className="blockies" src={makeBlockie(this.state.senderAddress)} />}
        />
      );
    }
    const { userAddress } = this.props;
    const { senderAddress } = this.state;
    const speechBubbleSide = userAddress === senderAddress ? 'speech-bubble-right' : 'speech-bubble-left';
    console.log('user', userAddress, 'sender', senderAddress);
    console.log(this.props);
    return (
      <div>
        {userAddress === senderAddress ? (
          <div className="messageContainerRight">
            <div>
              {blockie}
              <p>{this.state.messageAuthorAlias}</p>
            </div>
            <div className={speechBubbleSide}>
              <p>{this.state.messageData}</p>
              <p>{timeStamp ? timeStamp : ''}</p>
            </div>
          </div>
        ) : (
          <div className="messageContainerLeft">
            <div>
              {blockie}
              <p>{this.state.messageAuthorAlias}</p>
            </div>
            <div className={speechBubbleSide}>
              <p>{this.state.messageData}</p>
              <p>{timeStamp ? timeStamp : ''}</p>
            </div>{' '}
          </div>
        )}
      </div>
    );
  }
}
