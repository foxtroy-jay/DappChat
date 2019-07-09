import React from 'react';
import {
  Button,
  Header,
  Icon,
  Image,
  Search,
  Menu,
  Segment,
  Sidebar,
  MenuItem,
} from 'semantic-ui-react';
import Dummy from './dummy';
import { toast, Flip, ToastContainer } from 'react-toastify';

import ChannelsInHome from './ChannelsInHome';

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
      console.log('big success');
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
      console.log(this.state.results);
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
    // const { visible } = this.state;
    // const { hideSidebar } = this.props;
    // console.log('SEARCHSIDEBAR', this.props);
    // console.log('keys', Object.keys(this.props)[2]);
    // console.log('status', this.props[Object.keys(this.props)[2]]);
    // console.log('test', this.props['hideSidebar']);
    let status = this.props[Object.keys(this.props)[2]];
    const { results } = this.state;
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
            visible={status}
            width="wide"
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
            {results.map(idx => {
              return (
                <ChannelsInHome
                  channelIndex={idx}
                  drizzle={this.props.drizzle}
                  drizzleState={this.props.drizzleState}
                  key={idx}
                />
              );
            })}
            {/* <Menu.Item as="a">
              <Icon name="home" />
              <Dummy />
            </Menu.Item>
            <Menu.Item as="a">
              <Dummy />
            </Menu.Item>
            <Menu.Item as="a">
              <Icon name="camera" />
              Channels
            </Menu.Item> */}
          </Sidebar>

          <Sidebar.Pusher>
            {/*             <Segment basic>
              <Header as="h3">Application Content</Header>
              <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
            </Segment> */}
            {/* <Channel Messages rendered here /> */}
            <div className="channelDisplay"> YO LOOK HERE</div>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}
