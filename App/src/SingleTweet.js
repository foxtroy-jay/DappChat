import React from 'react';
import { Drizzle } from 'drizzle';
import options from './drizzleOptions';
const drizzle = new Drizzle(options);

export default class SingleTweet extends React.Component {
  constructor(props) {
    super();

    this.state = {};
  }
  async componentDidMount() {
    // call the func here
    const tweetData = await this.getData(this.props.address, this.props.index);
    this.setState(tweetData);
  }

  getData = async (address, index) => {
    const result = await drizzle.contracts.Twittor.methods
      .getEverythingTweetStruct(address, index)
      .call();
    return result;
  };

  render() {
    return (
      <div>
        <h1>Single</h1>
        <p>Address: {this.props.address}</p>
        <p>Block Num: {this.state[2]}</p>
        <p>Replies: {this.state[3]}</p>
        <p>Tweet: {this.state[0]}</p>
      </div>
    );
  }
}
