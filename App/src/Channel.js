import React from 'react';
import MessageForm from './MessageForm';
import SingleChannelView from './SingleChannelView';
import ChannelAdminView from './ChannelAdminView';

export default class Channel extends React.Component {
  render() {
    return (
      <div>
        <ChannelAdminView
          channelIndex={this.props.channelIndex}
          drizzle={this.props.drizzle}
          drizzleState={this.props.drizzleState}
        />
        <SingleChannelView
          channelIndex={this.props.channelIndex}
          drizzle={this.props.drizzle}
          drizzleState={this.props.drizzleState}
        />
        <MessageForm channelIndex={this.props.channelIndex} drizzle={this.props.drizzle} />
      </div>
    );
  }
}
