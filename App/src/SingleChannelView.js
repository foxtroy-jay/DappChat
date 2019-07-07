import React, { Component } from 'react';
import ChannelMessage from './ChannelMessage';
import { Loader } from 'semantic-ui-react';

export default class SingleChannelView extends Component {
  // renders a single channel
  constructor(props) {
    super();
    this.state = {
      channelOwner: '',
      channelName: '',
      channelCategory: '',
      channelMessages: 0,
      channelRestrictedStatus: true,
    };
  }

  async componentDidMount() {
    const channelData = await this.props.drizzle.contracts.DappChat.methods
      .getChannelData(this.props.channelIndex)
      .call();
    this.props.drizzle.contracts.DappChat.methods.getChannelData.cacheCall(this.props.channelIndex);

    this.setState({
      channelOwner: channelData[0],
      channelName: channelData[1],
      channelCategory: channelData[2],
      channelMessages: channelData[3],
      channelRestrictedStatus: channelData[4],
    });
  }

  updateMessageCount = () => {
    const { drizzleState } = this.props;

    // //Gets list of all single tweet keys
    const keys = Object.keys(drizzleState.contracts.DappChat.getChannelData);

    // //Searches through the getNumReply arguments, matches the index, and saves indentifier
    let identifier;
    if (keys.length) {
      for (let i = 0; i < keys.length; i++) {
        if (drizzleState.contracts.DappChat.getChannelData[keys[i]].args[0] === this.props.channelIndex) {
          identifier = keys[i];
          break;
        }
      }

      //   //Finds the newly updated num replies
      if (identifier) {
        return drizzleState.contracts.DappChat.getChannelData[identifier].value[3];
      }
      return 0;
    }
  };

  render() {
    console.log('props in singleChannelView', this.props);
    let length = this.updateMessageCount();

    let channelMessageArray = [];
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
    return (
      <div>
        <div>
          Channel Owner: {this.state.channelOwner ? this.state.channelOwner : <Loader size="mini" active inline />}
        </div>
        <div>
          Channel Name: {this.state.channelName ? this.state.channelName : <Loader size="mini" active inline />}
        </div>
        <div>
          Channel Category:{' '}
          {this.state.channelCategory ? this.state.channelCategory : <Loader size="mini" active inline />}
        </div>
        <div>Restricted: {this.state.channelRestrictedStatus ? 'True' : 'False'}</div>
        <p>Messages: {length}</p>
        {channelMessageArray.length === 0 ? <h2>No messages yet!</h2> : channelMessageArray}
      </div>
    );
  }
}
