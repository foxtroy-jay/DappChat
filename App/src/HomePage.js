import React from "react";
import Navbar from "./Navbar";
import SearchSideBar from "./SearchSideBar";
import SingleChannelView from "./SingleChannelView";
import Home from "./Home";
import Channel from "./Channel";
let defaultState = {
  hideSideBar: true,
  channelIndex: null
};

export default class HomePage extends React.Component {
  constructor(props, context) {
    super();
    this.drizzleState = context.drizzle;
    this.state = defaultState;
  }

  async componentDidMount() {
    // const channelData = await this.props.drizzle.contracts.DappChat.methods
    //   .getChannelData(this.props.channelIndex)
    //   .call();
    // this.setState({ channelIndex: channelData[3] - 1 });
    console.log("DRIZZLE ", this.props);
  }

  toggleSidebar = () => {
    this.setState({ hideSideBar: !this.state.hideSideBar });
  };

  clickChannel = channelIndex => {
    console.log("CLICK ", channelIndex);
    this.setState({ channelIndex });
  };

  render() {
    const { drizzle, drizzleState } = this.props;
    return (
      <div>
        <Navbar
          drizzle={drizzle}
          drizzleState={drizzleState}
          /* toggleSidebar={this.toggleSidebar} */
        />
        {/*         <Home drizzle={drizzle} drizzleState={drizzleState} /> */}
        {/* <AllChannels Component> */}
        {/* <ChatSection Component> */}
        <div className="main" style={{ display: "flex" }}>
          {/* <SearchSideBar drizzle={drizzle} drizzleState={drizzleState} /> */}
          <div className="left">
            {/* <Home
              drizzle={drizzle}
              drizzleState={drizzleState}
              clickChannel={this.clickChannel}
            /> */}

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
