import React from 'react';
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SingleTweet from './SingleTweet';
import { Button, Form, Message } from 'semantic-ui-react';
import UserPage from './UserPage';
import { Link } from 'react-router-dom';

export default class tweets extends React.Component {
  constructor(props, context) {
    super(props);
    this.drizzleState = context.drizzle;
    this.state = {
      userAddress: this.props.props.match.params.address || '',
      tweet: '',
      hashT: '',
      numTweets: 0,
      dataKey: null,
      loading: false,
      errorMessage: '',
    };
  }
  async componentDidMount() {
    if (!this.state.userAddress) {
      const accounts = await this.props.drizzle.web3.eth.getAccounts();
      this.setState({ userAddress: accounts[0] });
    }
    this.props.drizzle.contracts.Twittor.methods.getNumTweets.cacheCall(
      this.state.userAddress
    );
  }

  handleInputChange = event => {
    this.setState({
      tweet: event.target.value,
      hashT: this.findHashTag(event.target.value),
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ loading: true });
    toast.info('Processing tweet...', {
      position: 'top-right',
      autoClose: 10000,
      transition: Flip,
    });

    try {
      await this.props.drizzle.contracts.Twittor.methods
        .addTweetStruct(this.state.tweet, this.state.hashT)
        .send({ from: this.state.userAddress });
    } catch (error) {
      this.setState({ errorMessage: error.message });
      toast.dismiss();
    }

    this.setState({ loading: false, tweet: '', hashT: '' });
  };

  getTweet = async index => {
    const result = await this.props.drizzle.contracts.Twittor.methods
      .getEverythingTweetStruct(this.state.userAddress, index)
      .call();

    return result[0];
  };

  getNum = async index => {
    const numTweets = await this.props.drizzle.contracts.Twittor.methods
      .getNumTweets(this.state.userAddress)
      .call();
    this.setState({ numTweets });
    this.forceUpdate();
  };

  findHashTag(str) {
    const hashTIndex = str.indexOf('#');
    let hashT = '';

    if (hashTIndex !== -1) {
      let endOfHashT = str.indexOf(' ', hashTIndex);
      if (endOfHashT === -1) endOfHashT = str.length;
      hashT = str.slice(hashTIndex, endOfHashT);
    }
    return hashT || '';
  }

  render() {
    const { drizzleState } = this.props;
    let length = 0;
    const key = Object.keys(drizzleState.contracts.Twittor.getNumTweets)[0];
    //if getNumTweets has been initialized then set length to equal getNumTweets
    if (drizzleState.contracts.Twittor.getNumTweets[key]) {
      length = drizzleState.contracts.Twittor.getNumTweets[key].value;
    }

    let mapArray = [];
    if (length) {
      mapArray.length = length;
      mapArray.fill(1);
    }

    // console.log("drizzleState>>>>", this.props.drizzle.store.getState())
    // console.log("contractInstance>>>>>", this.contractInstance)
    return (
      <div className="App">
        <ToastContainer />
        <Button href="/UserPage">User Page</Button>
        {/* <UserPage drizzle={this.props.drizzle} drizzleState={drizzleState} /> */}
        {<h1>{length} </h1>}
        <div>
          <h1>{this.state.userAddress}'s Tweets</h1>
          <Form onSubmit={this.handleSubmit} error={!!this.state.errorMessage}>
            <input
              key="tweet"
              name="tweet"
              value={this.state.tweet}
              placeholder="tweet"
              onChange={this.handleInputChange}
            />
            <Message error header="Oops!" content={this.state.errorMessage} />
            <Button primary loading={this.state.loading}>
              Tweet
            </Button>
          </Form>
          <div className="allTweets">
            {mapArray
              .map((tweet, idx) => {
                return (
                  <SingleTweet
                    address={this.state.userAddress}
                    index={idx}
                    key={idx}
                    drizzle={this.props.drizzle}
                    drizzleState={drizzleState}
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
