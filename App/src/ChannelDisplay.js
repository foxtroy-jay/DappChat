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
  forceUpdate = async () => {
    const channelData = await this.props.drizzle.contracts.DappChat.methods
      .getChannelData(this.props.channelIndex)
      .call();

    const members = await this.props.drizzle.contracts.DappChat.methods
      .getMembersArray(this.props.channelIndex)
      .call();

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

    if (this.props.channelIndex !== this.state.channelIndex) {
      this.forceUpdate();
    }

    return (
      <div id="test">
        <ToastContainer />
        <div id="editChannelStyle">
          <FollowButton
            drizzle={drizzle}
            drizzleState={drizzleState}
            channelIndex={channelIndex}
          />
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
        <AddMessageForm
          channelIndex={channelIndex}
          drizzle={drizzle}
          disabled={disabled}
        />
      </div>
    );
  }
}
