import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SingleTweet from './SingleTweet';

export default class tweets extends React.Component {
  constructor(props, context) {
    super(props);
    this.drizzleState = context.drizzle;
    this.state = {
      userAddress: '',
      tweet: '',
      hashT: '',
      numTweets: 0,
      dataKey: null,
    };
  }
  async componentDidMount() {
    const { drizzle } = this.props;
    const accounts = await this.props.drizzle.web3.eth.getAccounts();

    // Initializes getNumTweets of store state
    // getNumTweets is initially an empty object so this call sets it to however
    // many tweets the current address passed to it has
    drizzle.contracts.Twittor.methods.getNumTweets.cacheCall(accounts[0]);
    this.setState({ userAddress: accounts[0] });
  }

  handleInputChange = event => {
    this.setState({
      tweet: event.target.value,
      hashT: this.findHashTag(event.target.value),
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    console.log(this.state, 'WHAT IS BEING SUBMITTED');
    await this.props.drizzle.contracts.Twittor.methods
      .addTweetStruct(this.state.tweet, this.state.hashT)
      .send({ from: this.state.userAddress });
  };

  getTweet = async index => {
    console.log('props ', this.props);
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

    // console.log("props", this.props)
    // console.log("drizzleState>>>>", this.props.drizzle.store.getState())
    // console.log("contractInstance>>>>>", this.contractInstance)
    return (
      <div className="App">
        <ToastContainer />
        {<h1>{length} </h1>}
        <div>
          <button onClick={this.getTweet}>GET TWEET</button>
          <button onClick={this.getNum}>GET Numtweets</button>

          <h1>TWEETS</h1>
          <form onSubmit={this.handleSubmit}>
            <input
              key="tweet"
              name="tweet"
              value={this.state.tweet}
              placeholder="tweet"
              onChange={this.handleInputChange}
            />
            <button type="submit">TWEET</button>
          </form>
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
