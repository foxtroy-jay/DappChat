import React from 'react';
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Channel from './Channel';
import { Button, Form, Message } from 'semantic-ui-react';
import UserPage from './UserPage';
import { Link } from 'react-router-dom';
import AddChannelForm from './AddChannelForm';
import ChannelsInHome from './ChannelsInHome'

const defaultState = {
  channelName: '',
  category: '',
  restrictedStatus: false,
  loading: false,
  errorMessage: '',
  channelClicked: false,
  singleChannelIndex: null,
};

export default class Home extends React.Component {
  constructor(props, context) {
    super(props);
    this.drizzleState = context.drizzle;
    this.state = defaultState;
  }

  async componentDidMount() {
    if (!this.state.userAddress) {
      const accounts = await this.props.drizzle.web3.eth.getAccounts();
      this.setState({ userAddress: accounts[0] });
    }
    this.props.drizzle.contracts.DappChat.methods.getFollowedChannels.cacheCall();
    this.setState({alias: await this.props.drizzle.contracts.DappChat.methods.aliases(this.state.userAddress).call()})
  }

  getTweet = async index => {
    const result = await this.props.drizzle.contracts.DappChat.methods
      .getEverythingTweetStruct(this.state.userAddress, index)
      .call();

    return result[0];
  };

  getNum = async index => {
    const numTweets = await this.props.drizzle.contracts.DappChat.methods
      .getNumTweets(this.state.userAddress)
      .call();
    this.setState({ numTweets });
    this.forceUpdate();
  };

  findHashTag(str) {
    const hashTagIndex = str.indexOf('#');
    let hashTag = '';

    if (hashTagIndex !== -1) {
      let endOfHashT = str.indexOf(' ', hashTagIndex);
      if (endOfHashT === -1) endOfHashT = str.length;
      hashTag = str.slice(hashTagIndex, endOfHashT);
    }
    return hashTag || '';
  }

  clickChannel = idx => {
    this.setState({
      channelClicked: !this.state.channelClicked,
      singleChannelIndex: idx,
    });
  };

  render() {
    const { drizzle, drizzleState } = this.props;
    let length = 0;
    const contractState = this.props.drizzleState.contracts.DappChat;
    let mapArray = [];

    if (contractState.getFollowedChannels['0x0']) {
      mapArray = contractState.getFollowedChannels['0x0'].value;
    }

    return this.state.channelClicked ? (
      <Channel channelIndex = {this.state.singleChannelIndex} drizzle = {this.props.drizzle} drizzleState= {this.props.drizzleState} />
    ) : (
      <div className="App">
        <ToastContainer />
        <Button href="/UserPage">User Page</Button>
        {<h1>{length} </h1>}
        <div>
          <h1>Address: {this.state.userAddress}</h1>
          <h1>{this.state.alias ? `${this.state.alias}'s Channels` : ''}</h1>

          <AddChannelForm
            drizzle={drizzle}
            drizzleState={drizzleState}
          />
          <div className="allTweets">
            {mapArray
              .map(channelIndex => {
                return (
                  <ChannelsInHome
                    address={this.state.userAddress}
                    channelIndex={channelIndex}
                    drizzle={drizzle}
                    drizzleState={drizzleState}
                    clickChannel={this.clickChannel}
                    key={channelIndex}
                  />
                );
              })
              .reverse()}
          </div>
        </div>
      </div>
    );
  }
}
