import React from 'react';
import { Menu, Segment, Sidebar, Icon, Input } from 'semantic-ui-react';
import { toast, Flip } from 'react-toastify';
import ChannelList from './ChannelList';
import SearchResults from './SearchResults';
import AddChannelForm from './AddChannelForm';

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
    this.state = {
      search: '',
      results: [],
      showSearch: false,
      searchWords: [],
    };
  }

  componentDidMount() {
    this.props.drizzle.contracts.DappChat.methods.getAllChannelsLength.cacheCall();
  }

  search = async event => {
    this.setState({ showSearch: false });
    if (event.key === 'Enter' || event.key === undefined) {
      this.setState({ loading: true });
      const searchWords = this.state.search
        .toLowerCase()
        .split(' ')
        .filter(word => {
          return !wordsToIgnore.includes(word);
        });

      this.setState({ searchWords, showSearch: true });
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
    const { drizzle, drizzleState, props } = this.props;
    const { searchWords, showSearch } = this.state;
    return (
      <div>
        <Sidebar.Pushable as={Segment}>
          <Sidebar
            as={Menu}
            id="sidebarStyle"
            animation="overlay"
            icon="labeled"
            inverted
            vertical
            visible={true}
            width="very wide"
            direction="left"
          >
            <Menu.Item>
              <div className="ui input focus flex" id="searchInputBox">
                {showSearch ? (
                  <Icon
                    name="arrow left"
                    link
                    inverted
                    onClick={() => this.setState({ showSearch: false })}
                  />
                ) : (
                  ''
                )}

                <Input
                  type="text"
                  placeholder="Search Channels"
                  onChange={this.handleInputChange}
                  value={this.state.search}
                  onKeyPress={this.search}
                  icon={<Icon name="search" link onClick={this.search} />}
                />
              </div>
            </Menu.Item>
            <Menu.Item>
              <div className="createChannelBtn">
                <AddChannelForm drizzle={drizzle} drizzleState={drizzleState} />
              </div>
            </Menu.Item>
            <Menu.Item>
              {showSearch ? (
                <SearchResults
                  drizzle={drizzle}
                  drizzleState={drizzleState}
                  searchWords={searchWords}
                  clickChannel={this.props.clickChannel}
                />
              ) : (
                <ChannelList
                  drizzle={drizzle}
                  drizzleState={drizzleState}
                  props={props}
                  clickChannel={this.props.clickChannel}
                />
              )}
            </Menu.Item>
          </Sidebar>

          <Sidebar.Pusher>
            <div className="channelDisplay" style={{ width: '475px' }}>
              YO LOOK HERE
            </div>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}
