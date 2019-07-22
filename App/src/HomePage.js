import React from 'react';
import Navbar from './Navbar';
import SearchSideBar from './SearchSideBar';
import Channel from './Channel';

const defaultState = {
  channelIndex: null,
};

export default class HomePage extends React.Component {
  constructor(props, context) {
    super();
    this.drizzleState = context.drizzle;
    this.state = defaultState;
  }

  clickChannel = channelIndex => {
    //Need to convert channel index to string for all conditional checks
    this.setState({ channelIndex: `${channelIndex}` });
  };

  render() {
    const { drizzle, drizzleState } = this.props;
    return (
      <div id="bigger">
        <Navbar drizzle={drizzle} drizzleState={drizzleState} />

        <div className="main" style={{ display: 'flex' }}>
          <div className="left">
            <SearchSideBar
              drizzle={drizzle}
              drizzleState={drizzleState}
              clickChannel={this.clickChannel}
            />
          </div>
          {this.state.channelIndex ? (
            <div className="right">
              <Channel
                drizzle={drizzle}
                drizzleState={drizzleState}
                channelIndex={this.state.channelIndex}
              />
            </div>
          ) : (
            <div className="right" />
          )}
        </div>
      </div>
    );
  }
}
