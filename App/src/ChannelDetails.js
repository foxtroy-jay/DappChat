import React from 'react';
import { Loader } from 'semantic-ui-react';

export default class ChannelDetails extends React.Component {
  constructor() {
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
    this.props.drizzle.contracts.DappChat.methods.getChannelData.cacheCall(
      this.props.channelIndex
    );

    this.setState({
      channelOwner: channelData[0],
      channelName: channelData[1],
      channelCategory: channelData[2],
      channelMessages: channelData[3],
      channelRestrictedStatus: channelData[4],
    });
  }
  render() {
    const {
      channelOwner,
      channelName,
      channelCategory,
      channelRestrictedStatus,
    } = this.state;

    return (
      <div>
        <div>
          Channel Owner:{' '}
          {channelOwner ? channelOwner : <Loader size="mini" active inline />}
        </div>
        <div>
          Channel Name:{' '}
          {channelName ? channelName : <Loader size="mini" active inline />}
        </div>
        <div>
          Channel Category:{' '}
          {channelCategory ? (
            channelCategory
          ) : (
            <Loader size="mini" active inline />
          )}
        </div>
        <div>Restricted: {channelRestrictedStatus ? 'True' : 'False'}</div>
      </div>
    );
  }
}
