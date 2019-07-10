import React from 'react';
import { Menu, Segment, Sidebar } from 'semantic-ui-react';
import { toast, Flip } from 'react-toastify';
import Home from './Home';
import SearchResults from './SearchResults';
import AddChannelForm from './AddChannelForm';

const wordsToIgnore = [ 'at', 'for', 'in', 'off', 'on', 'over', 'and', 'under', 'of', 'the', 'is', 'a' ];

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

  search = async (event) => {
    //     if (event.key === "Enter") {
    //       let channelsLength = this.props.drizzleState.contracts.DappChat
    //         .getAllChannelsLength["0x0"].value;

    if (event.key === 'Enter') {
      const searchWords = this.state.search.toLowerCase().split(' ').filter((word) => {
        return !wordsToIgnore.includes(word);
      });

      this.setState({ searchWords, showSearch: true });
    }
  };

  handleInputChange = (event) => {
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
            id="sidebarStyle"
            className="sidebarStyle"
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
              <div className="ui input focus flex">
                {showSearch ? (
                  <i className="angle left icon own-color" onClick={() => this.setState({ showSearch: false })} />
                ) : (
                  <i className="search icon own-color" />
                )}

                <input
                  type="text"
                  placeholder="Search Channels"
                  onChange={this.handleInputChange}
                  value={this.state.search}
                  onKeyPress={this.search}
                />
                <i className="search icon" />
              </div>
            </Menu.Item>
            <div className="createChannelBtn">
              <AddChannelForm drizzle={drizzle} drizzleState={drizzleState} />
            </div>
            <Menu.Item>
              {showSearch ? (
                <SearchResults
                  drizzle={drizzle}
                  drizzleState={drizzleState}
                  searchWords={searchWords}
                  clickChannel={this.props.clickChannel}
                />
              ) : (
                <Home
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
