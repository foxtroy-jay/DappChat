import React from 'react';
import { Dimmer, Loader, Image, Segment, Statistic } from 'semantic-ui-react';

export default class UserPage extends React.Component {
  constructor(props, context) {
    super(props);
    this.drizzleState = context.drizzle;
    this.state = {
      userAddress: this.props.props.match.params.address,
      numTweets: 0,
      numReplies: 0,
      following: 0,
      followers: 0,
      loading: true,
    };
  }

  fetchNumberOfTweets = async address => {
    const numTweets = await this.props.drizzle.contracts.Stealth.methods
      .getNumTweets(address)
      .call();
    this.setState({ numTweets: numTweets });
  };

  fetchNumberOfReplies = async address => {
    const batch = [];
    for (let i = 0; i < this.state.numTweets; i++) {
      batch.push(
        this.props.drizzle.contracts.Stealth.methods
          .getNumReplies(address, i)
          .call()
      );
    }

    const numReplies = await Promise.all(batch);
    const numRepliesTotal = numReplies.reduce((acc, curr) => acc + +curr, 0);
    this.setState({ numReplies: numRepliesTotal });
  };

  fetchNumberOfFollowing = async address => {
    let count = 0;
    let currFollowing;
    try {
      currFollowing = await this.props.drizzle.contracts.Stealth.methods
        .viewFollowing(address, count)
        .call();
    } catch (error) {
      console.log(error.message, 'ERROR');
    }
    console.log(currFollowing);
    // do {
    //   currFollowing = await this.props.drizzle.contracts.Stealth.methods.viewFollowing(
    //     address,
    //     count
    //   );
    //   count++;
    // } while (currFollowing);

    // this.setState({ following: count });
  };

  async componentDidMount() {
    if (!this.state.userAddress) {
      const accounts = await this.props.drizzle.web3.eth.getAccounts();
      this.setState({ userAddress: accounts[0] });
    }
    const { userAddress } = this.state;
    await this.fetchNumberOfTweets(userAddress);
    await this.fetchNumberOfReplies(userAddress);
    // await this.fetchNumberOfFollowing(userAddress);
    this.setState({ loading: false });
  }

  populateData = () => {
    return [
      { key: 'numTweets', label: 'Tweets', value: `${this.state.numTweets}` },
      {
        key: 'numReplies',
        label: 'Replies',
        value: `${this.state.numReplies}`,
      },
      {
        key: 'following',
        label: 'Following',
        value: `${this.state.following}`,
      },
      {
        key: 'followers',
        label: 'Followers',
        value: `${this.state.followers}`,
      },
    ];
  };

  render() {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <h1>User Page</h1>
        <h3>Address: {this.state.userAddress}</h3>

        <div>
          <Statistic.Group items={this.populateData()} />
        </div>

        <Loader size="massive" active={this.state.loading} inline>
          Loading
        </Loader>
      </div>
    );
  }
}
