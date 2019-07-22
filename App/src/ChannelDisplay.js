import React from 'react';
import AddMessageForm from './AddMessageForm';
import SingleChannelView from './SingleChannelView';
import EditChannelForm from './EditChannelForm';
import { toast, Flip } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import FollowButton from './FollowButton';

export default class ChannelDisplay extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      restricted: false,
      members: [],
      channelIndex: null,
    };
  }

  componentDidMount() {
    this.fetchData(this.props.channelIndex);
  }

<<<<<<< HEAD:App/src/Channel.js
  componentDidUpdate(prevProps) {
    if (this.props.channelIndex !== prevProps.channelIndex) {
      this.fetchData(this.props.channelIndex);
    }
  }

  fetchData = async channelIndex => {
    const channelData = await this.props.drizzle.contracts.DappChat.methods
      .getChannelData(channelIndex)
      .call();
    const members = await this.props.drizzle.contracts.DappChat.methods
      .getMembersArray(channelIndex)
      .call();
=======
  fetchData = async (channelIndex) => {
    const channelData = await this.props.drizzle.contracts.DappChat.methods.getChannelData(channelIndex).call();

    const members = await this.props.drizzle.contracts.DappChat.methods.getMembersArray(channelIndex).call();
>>>>>>> master:App/src/ChannelDisplay.js

    this.setState({
      channelOwner: channelData[0],
      restricted: channelData[4],
      userAddress: this.props.drizzleState.accounts[0],
      members,
      channelIndex: this.props.channelIndex,
    });
  };

  openToast = () => {
    toast.info('Processing change...', {
      position: 'top-right',
      autoClose: 10000,
      transition: Flip,
    });
  };

  closeToast = () => {
    toast.dismiss();
  };

  checkMember = () => {
    if (this.state.restricted) {
      return !this.state.members.includes(this.state.userAddress);
    }
    return false;
  };

  render() {
    const { channelIndex } = this.props;
    const { drizzle, drizzleState } = this.props;
    const disabled = this.checkMember();

    return (
      <div id="test">
        <ToastContainer />
        <div id="editChannelStyle">
          <FollowButton drizzle={drizzle} drizzleState={drizzleState} channelIndex={channelIndex} />
          {this.state.channelOwner === this.state.userAddress ? (
            <EditChannelForm
              id="editChannelStyle"
              channelIndex={channelIndex}
              drizzle={drizzle}
              drizzleState={drizzleState}
              openToast={this.openToast}
              closeToast={this.closeToast}
            />
          ) : (
            ''
          )}
        </div>
        <SingleChannelView
          channelIndex={channelIndex}
          drizzle={drizzle}
          drizzleState={drizzleState}
          userAddress={this.state.userAddress}
        />
        <AddMessageForm channelIndex={channelIndex} drizzle={drizzle} disabled={disabled} />
      </div>
    );
  }
}
