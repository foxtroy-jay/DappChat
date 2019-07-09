import React from 'react';
import { Loader, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class ChannelsInHome extends React.Component {
  constructor(props) {
    super();

    this.state = {
      message: '',
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

    this.setState(channelData);
  }

  render() {
    const { channelIndex } = this.props;
    return (
      <Menu.Item>
        Channel Name:{' '}
        {this.state[1] ? this.state[1] : <Loader size="mini" active inline />}
        <div>
          Channel Owner:{' '}
          {this.state[0] ? this.state[0] : <Loader size="mini" active inline />}
        </div>
        <div>
          {/* <Link to={{ pathname: '/channel', state: { channelIndex } }}>
            Channel Name:{' '}
            {this.state[1] ? (
              this.state[1]
            ) : (
              <Loader size="mini" active inline />
            )}
          </Link> */}
        </div>
        <div>
          Channel Category:{' '}
          {this.state[2] ? this.state[2] : <Loader size="mini" active inline />}
        </div>
        <div>Restricted: {this.state[4] ? 'True' : 'False'}</div>
      </Menu.Item>
    );
  }
}
