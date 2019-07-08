import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddChannelForm from './AddChannelForm';
import ChannelDetails from './ChannelDetails';

const defaultState = {
  channelName: '',
  category: '',
  restrictedStatus: false,
  loading: false,
  errorMessage: '',
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
    this.setState({
      alias: await this.props.drizzle.contracts.DappChat.methods
        .aliases(this.state.userAddress)
        .call(),
    });
    this.props.drizzle.contracts.DappChat.methods.getAllChannelsLength.cacheCall();
  }

  render() {
    const { drizzle, drizzleState } = this.props;
    const { userAddress, alias } = this.state;
    const contractState = this.props.drizzleState.contracts.DappChat;
    let mapArray = [];

    if (contractState.getFollowedChannels['0x0']) {
      mapArray = contractState.getFollowedChannels['0x0'].value;
    }
    return (
      <div className="App">
        <ToastContainer />
        <div>
          <h1>Address: {userAddress}</h1>
          <h1>{alias ? `${alias}'s Channels` : ''}</h1>

          <AddChannelForm drizzle={drizzle} drizzleState={drizzleState} />
          <div className="allChannels">
            {mapArray
              .map(channelIndex => {
                return (
                  <ChannelDetails
                    channelIndex={channelIndex}
                    drizzle={drizzle}
                    drizzleState={drizzleState}
                    key={channelIndex}
                    renderLink={true}
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
