import React from 'react';
import ReplyTweet from './ReplyTweet';

export default class SingleTweet extends React.Component {
  constructor(props) {
    super();

    this.state = { reply: '' };
  }
  async componentDidMount() {
    await this.props.drizzle.contracts.Twittor.methods.getNumReplies.cacheCall(
      this.props.address,
      this.props.index
    );

    const tweetData = await this.getData(this.props.address, this.props.index);
    this.setState(tweetData);
  }

  getData = async (address, index) => {
    const result = await this.props.drizzle.contracts.Twittor.methods
      .getEverythingTweetStruct(address, index)
      .call();
    return result;
  };

  handleInputChange = event => {
    this.setState({
      reply: event.target.value,
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    await this.props.drizzle.contracts.Twittor.methods
      .addReply(this.props.address, this.props.index, this.state.reply)
      .send({ from: this.props.address });
  };

  render() {
    const { drizzleState } = this.props;
    let length = 0;
    let identifier;

    //Gets list of all single tweet keys
    const keys = Object.keys(drizzleState.contracts.Twittor.getNumReplies);

    //Searches through the getNumReply arguments, matches the index, and saves indentifier
    if (keys.length) {
      for (let i = 0; i < keys.length; i++) {
        if (
          drizzleState.contracts.Twittor.getNumReplies[keys[i]].args[1] ===
          this.props.index
        ) {
          identifier = keys[i];
          break;
        }
      }

      //Finds the newly updated num replies
      if (identifier) {
        length = drizzleState.contracts.Twittor.getNumReplies[identifier].value;
      }
    }
    let mapArray = [];
    if (length) {
      mapArray.length = length;
      mapArray.fill(1);
    }

    return (
      <div>
        <h1>Single</h1>
        <p>Address: {this.props.address}</p>
        <p>Block Num: {this.state[2]}</p>
        <p>Replies: {length}</p>

        <div>
          <button
            onClick={() =>
              this.setState({ displayReply: !this.state.displayReply })
            }
          >
            Replies
          </button>
          {this.state.displayReply ? (
            <div>
              <form onSubmit={this.handleSubmit}>
                <input
                  key="reply"
                  name="reply"
                  value={this.state.reply}
                  placeholder="reply"
                  onChange={this.handleInputChange}
                />
                <button type="submit">Reply</button>
              </form>

              <div>
                {mapArray.length > 0 ? (
                  mapArray
                    .map((tweet, idx) => {
                      return (
                        <ReplyTweet
                          address={this.props.address}
                          index={this.props.index}
                          replyIndex={idx}
                          key={idx}
                          drizzle={this.props.drizzle}
                        />
                      );
                    })
                    .reverse()
                ) : (
                  <h2>No replies yet</h2>
                )}
              </div>
            </div>
          ) : (
            <p />
          )}
        </div>

        <p>Tweet: {this.state[0]}</p>
      </div>
    );
  }
}
