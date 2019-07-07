import React from 'react';
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Channel from './Channel';
import { Button, Form, Message } from 'semantic-ui-react';
import UserPage from './UserPage';
import { Link } from 'react-router-dom';

const defaultState = {
  channelName: '',
  category: '',
  restrictedStatus: false,
  loading: false,
  errorMessage: '',
};

export default class tweets extends React.Component {
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
    // console.log('componentdidmount', this.state.userAddress);
    // console.log('methods', this.props.drizzle.contracts.DappChat.methods);
    // this.props.drizzle.contracts.DappChat.methods.followedChannels.cacheCall(
    //   this.state.userAddress,
    //   0
    // );
    // let test = await this.props.drizzle.contracts.DappChat.methods.followedChannels(this.state.userAddress).call();
    // console.log('after', test);
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    toast.info('Processing tweet...', {
      position: 'top-right',
      autoClose: 10000,
      transition: Flip,
    });

    try {
      await this.props.drizzle.contracts.DappChat.methods
        .addChannelStruct(this.state.channelName, this.state.category, this.state.restrictedStatus)
        .send({ from: this.state.userAddress });
    } catch (error) {
      this.setState({ errorMessage: error.message });
      toast.dismiss();
    }

    this.setState(defaultState);
  };

  getTweet = async (index) => {
    const result = await this.props.drizzle.contracts.DappChat.methods
      .getEverythingTweetStruct(this.state.userAddress, index)
      .call();

    return result[0];
  };

  getNum = async (index) => {
    const numTweets = await this.props.drizzle.contracts.DappChat.methods.getNumTweets(this.state.userAddress).call();
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

  render() {
    const { drizzleState } = this.props;
    let length = 0;

    const key = Object.keys(drizzleState.contracts.DappChat.getAllChannelsLength)[0];
    if (drizzleState.contracts.DappChat.getAllChannelsLength[key]) {
      length = drizzleState.contracts.DappChat.getAllChannelsLength[key].value;
    }
    length = 2;
    let mapArray = [];
    if (length) {
      mapArray.length = length;
      mapArray.fill(1);
    }

    return (
      <div className="App">
        <ToastContainer />
        <Button href="/UserPage">User Page</Button>
        {<h1>{length} </h1>}
        <div>
          <h1>{this.state.userAddress}'s Channels</h1>
          <Form onSubmit={this.handleSubmit} error={!!this.state.errorMessage}>
            <input
              key="channelName"
              name="channelName"
              value={this.state.channelName}
              placeholder="Channel Name"
              onChange={this.handleInputChange}
            />
            <input
              key="category"
              name="category"
              value={this.state.category}
              placeholder="Channel Category"
              onChange={this.handleInputChange}
            />
            <select
              key="restrictedStatus"
              name="restrictedStatus"
              value={this.state.restrictedStatus}
              placeholder="Select"
              onChange={this.handleInputChange}
            >
              <option value={true}>True</option>
              <option value={false}>False</option>
            </select>
            <Message error header="Oops!" content={this.state.errorMessage} />
            <Button primary loading={this.state.loading}>
              Tweet
            </Button>
          </Form>
          <div className="allTweets">
            {mapArray
              .map((tweet, idx) => {
                return (
                  <Channel
                    address={this.state.userAddress}
                    channelIndex={idx}
                    drizzle={this.props.drizzle}
                    drizzleState={drizzleState}
                    key={idx}
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
