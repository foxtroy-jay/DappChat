import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ContractData } from 'drizzle-react-components';
import TweetForm from './TweetForm';
import SingleTweet from './SingleTweet';
import { Drizzle } from 'drizzle';
import options from './drizzleOptions';

const drizzle = new Drizzle(options);
export default class tweets extends React.Component {
  constructor(props) {
    super();
    this.state = { userAddress: '' };
  }
  async componentDidMount() {
    const accounts = await drizzle.web3.eth.getAccounts();
    this.setState({ userAddress: accounts[0] });
  }

  render() {
    let length = 0;
    const getNumTweetsFirstKey = Object.keys(
      this.props.Twittor.getNumTweets
    )[1];
    if (this.props.Twittor.getNumTweets[getNumTweetsFirstKey]) {
      length = this.props.Twittor.getNumTweets[getNumTweetsFirstKey].value;
    }
    let mapArray = [];
    if (length) {
      mapArray.length = length;
      mapArray.fill(1);
    }

    return (
      <div className="App">
        <ToastContainer />

        <div>
          <h1>TWEETS</h1>
          <TweetForm contract="Twittor" method="addTweetStruct" />
          <div className="allTweets">
            {mapArray
              .map((tweet, idx) => {
                return (
                  <SingleTweet
                    address={this.state.userAddress}
                    index={idx}
                    key={idx}
                  />
                );
              })
              .reverse()}
          </div>
          <div className="hide">
            {
              <ContractData
                contract="Twittor"
                method="getNumTweets"
                methodArgs={[this.state.userAddress]}
              />
            }
          </div>
        </div>
      </div>
    );
  }
}
