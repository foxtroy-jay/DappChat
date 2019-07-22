import React from 'react';
import Navbar from './Navbar';
import SearchSideBar from './Searchbar';
import ChannelDisplay from './ChannelDisplay';

const defaultState = {
  hideSideBar: true,
  channelIndex: null,
};

export default class HomePage extends React.Component {
  constructor(props, context) {
    super();
    this.drizzleState = context.drizzle;
    this.state = defaultState;
  }

  toggleSidebar = () => {
    this.setState({ hideSideBar: !this.state.hideSideBar });
  };

  clickChannel = channelIndex => {
    this.setState({ channelIndex });
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
              <ChannelDisplay
                drizzle={drizzle}
                drizzleState={drizzleState}
                channelIndex={this.state.channelIndex}
                props={this.props.props}
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
