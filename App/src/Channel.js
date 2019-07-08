import React from 'react';
import MessageForm from './MessageForm';
import SingleChannelView from './SingleChannelView';
import ChannelAdminView from './ChannelAdminView';
import { toast, Flip } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import FollowButton from './FollowButton';

export default class Channel extends React.Component {
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

  render() {
    const { channelIndex } = this.props.props.location.state;
    const { drizzle, drizzleState } = this.props;
    return (
      <div>
        <ToastContainer />
        <FollowButton 
          drizzle={drizzle}
          drizzleState={drizzleState}
          channelIndex = {channelIndex}
          />
        <ChannelAdminView
          channelIndex={channelIndex}
          drizzle={drizzle}
          drizzleState={drizzleState}
          openToast={this.openToast}
          closeToast={this.closeToast}
        />
        <SingleChannelView
          channelIndex={channelIndex}
          drizzle={drizzle}
          drizzleState={drizzleState}
        />
        <MessageForm channelIndex={channelIndex} drizzle={drizzle} />
      </div>
    );
  }
}
