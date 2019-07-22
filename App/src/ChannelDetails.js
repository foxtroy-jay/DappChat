import React from 'react';
import { Loader, Container } from 'semantic-ui-react';

export default class ChannelDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      channelIndex: null,
      channelOwner: '',
      channelName: '',
      channelCategory: '',
      channelMessages: 0,
      channelRestrictedStatus: true,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.channelAddress !== prevProps.channelAddress) {
      this.fetchData();
    }
  }

  fetchData() {
    const channelData = this.props.drizzleState.contracts.DappChat.getChannelData[this.props.channelAddress].value;
    this.setState({
      channelOwner: channelData[0],
      channelName: channelData[1],
      channelCategory: channelData[2],
      channelMessages: channelData[3],
      channelRestrictedStatus: channelData[4],
      channelIndex: this.props.channelIndex,
    });
  }

  render() {
    return (
      <Container textAlign="justified">
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
      </Container>
    );
  }
}
