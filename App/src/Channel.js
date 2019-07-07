import React from 'react';
import MessageForm from './MessageForm';
import SingleChannelView from './SingleChannelView';

export default class Channel extends React.Component {
  render() {
    console.log('is this loading?')
    return (
      <div>
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
