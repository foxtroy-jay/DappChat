import React from 'react';

export default class SingleTweet extends React.Component {
  constructor(props) {
    super();
    this.state = { tweetData: '' };
  }
  async componentDidMount() {
    const tweetData = await this.getData(
      this.props.address,
      this.props.index,
      this.props.replyIndex
    );
    this.setState({ tweetData });
  }

  getData = async (address, index, replyIndex) => {
    const result = await this.props.drizzle.contracts.Twittor.methods
      .getReply(address, index, replyIndex)
      .call();
    return result;
  };

  render() {
    return (
      <div style={{ border: 'solid' }}>
        <h1>Reply</h1>
        <p>From: {this.props.address}</p>
        <p>Reply:{this.state.tweetData}</p>
      </div>
    );
  }
}
