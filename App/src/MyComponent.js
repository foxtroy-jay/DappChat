import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ContractData } from 'drizzle-react-components';
import TweetForm from './TweetForm';
import SingleTweet from './SingleTweet';

export default class tweets extends React.Component {
  render() {
    let length = 0;
    const userAddress = this.props.accounts[0];
    const getNumTweetsFirstKey = Object.keys(
      this.props.Twittor.getNumTweets
    )[0];
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
          <h1>Test</h1>
          <h1>TWEETS</h1>
          <TweetForm contract="Twittor" method="addTweetStruct" />
          <div className="allTweets">
            {mapArray
              .map((tweet, idx) => {
                return (
                  <SingleTweet address={userAddress} index={idx} key={idx} />
                );
              })
              .reverse()}
          </div>
          <div className="hide">
            {
              <ContractData
                contract="Twittor"
                method="getNumTweets"
                methodArgs={[userAddress]}
              />
            }
          </div>
        </div>
      </div>
    );
  }
}
