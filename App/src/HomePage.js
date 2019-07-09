import React from 'react';
import Navbar from './Navbar';
import SearchSideBar from './SearchSideBar';
import Home from './Home';

let defaultState = {
  hideSideBar: false,
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
  render() {
    const { drizzle, drizzleState } = this.props;
    const { hideSideBar } = this.state;
    return (
      <div>
        <Navbar
          drizzle={drizzle}
          drizzleState={drizzleState}
          toggleSidebar={this.toggleSidebar}
        />
        <Home drizzle={drizzle} drizzleState={drizzleState} />
        {/* <AllChannels Component> */}
        {/* <ChatSection Component> */}
        <SearchSideBar
          drizzle={drizzle}
          drizzleState={drizzleState}
          hideSideBar={hideSideBar}
        />
      </div>
    );
  }
}
