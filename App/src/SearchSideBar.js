import React from 'react';
import { Menu, Segment, Sidebar } from 'semantic-ui-react';
import { toast, Flip } from 'react-toastify';

import ChannelsInHome from './ChannelsInHome';
import Home from './Home';

const wordsToIgnore = [
  'at',
  'for',
  'in',
  'off',
  'on',
  'over',
  'and',
  'under',
  'of',
  'the',
  'is',
  'a',
];

export default class SidebarExampleSidebar extends React.Component {
  constructor() {
    super();
    this.state = { search: '', results: [], showSearch: true };
  }

  componentDidMount() {
    this.props.drizzle.contracts.DappChat.methods.getAllChannelsLength.cacheCall();
  }

  search = async event => {
    if (event.key === 'Enter') {
      let channelsLength = this.props.drizzleState.contracts.DappChat
        .getAllChannelsLength['0x0'].value;

      const searchWords = this.state.search
        .toLowerCase()
        .split(' ')
        .filter(word => {
          return !wordsToIgnore.includes(word);
        });

      let results = [];
      let channel;
      for (let i = 0; i < channelsLength; i++) {
        channel = await this.props.drizzle.contracts.DappChat.methods
          .getChannelData(i)
          .call();
        let channelName = channel[1].toLowerCase();

        let doWeInclude = searchWords.every(word => {
          return channelName.includes(word);
        });
        if (doWeInclude) {
          results.push(i);
        }
      }

      this.setState({ results });
    }
  };

  handleInputChange = event => {
    this.setState({ search: event.target.value });
  };

  openToast = () => {
    toast.info('Processing change...', {
      position: 'top-right',
      autoClose: 10000,
      transition: Flip,
    });
  };

  closeToast = () => {
    toast.dismiss();
  };

  render() {
    let status = this.props[Object.keys(this.props)[2]];
    const { results } = this.state;
    const { drizzle, drizzleState, props } = this.props;
    return (
      <div>
        <Sidebar.Pushable as={Segment}>
          <Sidebar
            as={Menu}
            animation="overlay"
            icon="labeled"
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={true}
            width="very wide"
            direction="left"
          >
            <Menu.Item>
              <div className="ui input focus">
                <input
                  type="text"
                  placeholder="Search Channels"
                  onChange={this.handleInputChange}
                  value={this.state.search}
                  onKeyPress={this.search}
                />
              </div>
            </Menu.Item>
            {/* {results.map(idx => {
              return (
                <ChannelsInHome
                  channelIndex={idx}
                  drizzle={this.props.drizzle}
                  drizzleState={this.props.drizzleState}
                  key={idx}
                />
              );
            })} */}
            <Menu.Item>
              <Home
                drizzle={drizzle}
                drizzleState={drizzleState}
                props={props}
              />
            </Menu.Item>
          </Sidebar>

          <Sidebar.Pusher>
            <div className="channelDisplay"> YO LOOK HERE</div>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}
