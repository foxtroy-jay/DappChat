import React from "react";
import makeBlockie from "ethereum-blockies-base64";
import { Popup } from "semantic-ui-react";

export default class ChannelMessage extends React.Component {
  constructor() {
    super();
    this.state = {
      messageData: "",
      senderAddress: "",
      timeStamp: "",
      messageAuthorAlias: ""
    };
  }
  async componentDidMount() {
    const messageData = await this.props.drizzle.contracts.DappChat.methods
      .getReplyData(this.props.channelIndex, this.props.messageIndex)
      .call();

    const messageAuthorAlias = await this.props.drizzle.contracts.DappChat.methods.aliases(
      messageData[1]
    );

    this.setState({
      messageData: messageData[0],
      senderAddress: messageData[1],
      timeStamp: messageData[3]
      // messageAuthorAlias
    });
    this.props.drizzle.contracts.DappChat.methods.getMessage.cacheCall(
      this.props.channelIndex,
      this.props.messageIndex
    );
  }

  render() {
    let blockie;
    if (this.state.senderAddress) {
      blockie = (
        <Popup
          content={this.state.senderAddress}
          flowing
          hoverable
          trigger={
            <img
              alt="blockie"
              className="blockies"
              src={makeBlockie(this.state.senderAddress)}
            />
          }
        />
      );
    }
    return (
      <div style={{ border: "solid" }}>
        <div>
          {blockie}
          <p>{this.state.messageAuthorAlias}</p>
        </div>
        <div>
          <p>{this.state.messageData}</p>
          <p>{this.state.timeStamp ? this.state.timeStamp : ""}</p>
        </div>
      </div>
    );
  }
}
