import React, { Component } from 'react';
import ChannelMessage from './ChannelMessage';
import ChannelDetails from './ChannelDetails';
import { Container, Segment } from 'semantic-ui-react';

export default class SingleChannelView extends Component {
  constructor() {
    super();
    this.state = {
      channelIndex: null,
      channelOwner: '',
      channelName: '',
      channelAddress: '',
      channelCategory: '',
      channelMessages: 0,
      channelRestrictedStatus: true,
    };
  }

  async componentDidMount() {
    this.props.drizzle.contracts.DappChat.methods.getChannelData.cacheCall(this.props.channelIndex);

    this.setState({
      channelMessages: this.fetchMessageCount(),
      channelAddress: this.fetchChannelAddress(),
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.channelIndex !== prevProps.channelIndex) {
      this.setState({
        channelMessages: this.fetchMessageCount(),
        channelAddress: this.fetchChannelAddress(),
      });
    }
  }

  fetchChannelAddress = () => {
    const { channelIndex, drizzleState } = this.props;
    const keys = Object.keys(drizzleState.contracts.DappChat.getChannelData);

    //Searches through the ChannelData arguments, matches the index, and saves identifier
    let identifier;
    if (keys.length) {
      for (let i = 0; i < keys.length; i++) {
        if (drizzleState.contracts.DappChat.getChannelData[keys[i]].args[0] === channelIndex) {
          identifier = keys[i];
          break;
        }
      }
      return identifier;
    }
  };

  fetchMessageCount = () => {
    const { drizzleState } = this.props;
    let identifier = this.fetchChannelAddress();

    //Finds the updated number of messages
    if (identifier) {
      return drizzleState.contracts.DappChat.getChannelData[identifier].value[3];
    }

    //If address doesn't exist in ChannelData message count should be 0
    return 0;
  };

  generateMessages() {
    let channelMessageArray = [];
    if (this.props.drizzleState.drizzleStatus.initialized && this.state.channelAddress) {
      let length = this.props.drizzleState.contracts.DappChat.getChannelData[this.state.channelAddress].value[3];

      if (length !== this.state.channelMessages) {
        this.setState({ channelMessages: length });
      }
      for (let idx = 0; idx < length; idx++) {
        channelMessageArray.push(
          <ChannelMessage
            userAddress={this.props.userAddress}
            channelIndex={this.props.channelIndex}
            messageIndex={idx}
            drizzle={this.props.drizzle}
            key={idx}
          />,
        );
      }
    }
    return channelMessageArray;
  }

  render() {
    let channelMessageArray = this.generateMessages();
    return (
      <div>
        {this.state.channelAddress && (
          <ChannelDetails
            drizzle={this.props.drizzle}
            drizzleState={this.props.drizzleState}
            channelIndex={this.props.channelIndex}
            channelAddress={this.state.channelAddress}
          />
        )}
        <p>Messages: {this.state.channelMessages}</p>
        {channelMessageArray.length === 0 ? <h2>No messages yet!</h2> : channelMessageArray}
      </div>
    );
  }
}
