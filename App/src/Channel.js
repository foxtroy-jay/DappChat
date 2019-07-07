import React from 'react';
import MessageForm from './MessageForm';
import SingleChannelView from './SingleChannelView';

export default class Channel extends React.Component {
  render() {
    let { channelIndex } = this.props.props.location.state;
    return (
      <div>
        <SingleChannelView
          channelIndex={channelIndex}
          drizzle={this.props.drizzle}
          drizzleState={this.props.drizzleState}
        />
        <MessageForm channelIndex={channelIndex} drizzle={this.props.drizzle} />
      </div>
    );
  }
}
