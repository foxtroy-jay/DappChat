import React from 'react';
import MessageForm from './MessageForm';
import SingleChannelView from './SingleChannelView';
import ChannelAdminView from './ChannelAdminView';
import { toast, Flip } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import FollowButton from './FollowButton';

export default class Channel extends React.Component {
  constructor(props) {
    super();

    this.state = {
      restricted: false,
      members: [],
    };
  }
  componentDidMount = async () => {
    const channelData = await this.props.drizzle.contracts.DappChat.methods
      .getChannelData(this.props.props.location.state.channelIndex)
      .call();
    this.setState({
      channelOwner: channelData[0],
      restricted: channelData[4],
      userAddress: this.props.drizzleState.accounts[0],
    });
    this.setState({
      members: await this.props.drizzle.contracts.DappChat.methods
        .getMembersArray(this.props.props.location.state.channelIndex)
        .call(),
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
      return this.state.members.includes(this.state.userAddress);
    }

    return false;
  };

  render() {
    const { channelIndex } = this.props.props.location.state;
    const { drizzle, drizzleState } = this.props;
    return (
      <div>
        <ToastContainer />
        <FollowButton
          drizzle={drizzle}
          drizzleState={drizzleState}
          channelIndex={channelIndex}
        />
        {this.state.channelOwner === this.state.userAddress ? (
          <ChannelAdminView
            channelIndex={channelIndex}
            drizzle={drizzle}
            drizzleState={drizzleState}
            openToast={this.openToast}
            closeToast={this.closeToast}
          />
        ) : (
          ''
        )}
        <SingleChannelView
          channelIndex={channelIndex}
          drizzle={drizzle}
          drizzleState={drizzleState}
        />
        <MessageForm
          channelIndex={channelIndex}
          drizzle={drizzle}
          disabled={!this.checkMember()}
        />
      </div>
    );
  }
}
