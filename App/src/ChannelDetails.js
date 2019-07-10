import React from "react";
import { Loader } from "semantic-ui-react";

export default class ChannelDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      channelIndex: null,
      channelOwner: "",
      channelName: "",
      channelCategory: "",
      channelMessages: 0,
      channelRestrictedStatus: true
    };
  }

  forceUpdate = async channelIndex => {
    const channelData = await this.props.drizzle.contracts.DappChat.methods
      .getChannelData(channelIndex)
      .call();
    this.props.drizzle.contracts.DappChat.methods.getChannelData.cacheCall(
      channelIndex
    );
    this.setState({
      channelOwner: channelData[0],
      channelName: channelData[1],
      channelCategory: channelData[2],
      channelMessages: channelData[3],
      channelRestrictedStatus: channelData[4],
      channelIndex: this.props.channelIndex
    });
  };
  render() {
    if (this.props.channelIndex !== this.state.channelIndex) {
      this.forceUpdate(this.props.channelIndex);
    }
    return (
      <div>
        <div>
          Channel Owner:{" "}
          {this.state.channelOwner ? (
            this.state.channelOwner
          ) : (
            <Loader size="mini" active inline />
          )}
        </div>
        <div>
          Channel Name:{" "}
          {this.state.channelName ? (
            this.state.channelName
          ) : (
            <Loader size="mini" active inline />
          )}
        </div>
        <div>
          Channel Category:{" "}
          {this.state.channelCategory ? (
            this.state.channelCategory
          ) : (
            <Loader size="mini" active inline />
          )}
        </div>
        <div>
          Restricted: {this.state.channelRestrictedStatus ? "True" : "False"}
        </div>
      </div>
    );
  }
}
