import React from "react";
import ChannelsInHome from "./ChannelsInHome";
import makeBlockie from "ethereum-blockies-base64";

export default class SearchResult extends React.Component {
  constructor() {
    super();
    this.state = {
      results: []
    };
  }

  componentDidMount() {
    this.props.drizzle.contracts.DappChat.methods.getAllChannelsLength.cacheCall();
    this.search();
  }

  search = async () => {
    let channelsLength = this.props.drizzleState.contracts.DappChat
      .getAllChannelsLength["0x0"].value;

    const searchWords = this.props.searchWords;

    let results = [];
    let channel;
    for (let i = 0; i < channelsLength; i++) {
      channel = await this.props.drizzle.contracts.DappChat.methods
        .getChannelData(i)
        .call();
      let channelName = channel[1].toLowerCase();

      let doWeInclude = searchWords.every(word => {
        return channelName.includes(word);
      });
      if (doWeInclude) {
        results.push(i);
      }
    }

    this.setState({ results });
  };

  render() {
    const { results } = this.state;
    const { drizzle, drizzleState } = this.props;
    console.log(this.state.userAddress);
    return (
      <div className="App">
        <div className="Home">
          <h1>
            Search
            {this.state.userAddress ? (
              <img
                alt="blockies"
                className="blockies"
                src={makeBlockie(this.state.userAddress)}
              />
            ) : (
              ""
            )}
          </h1>
          <h1>{this.state.alias ? `${this.state.alias}'s Channels` : ""}</h1>

          <div className="userChannels">
            {results.length !== 0 ? (
              results
                .map(channelIndex => {
                  if (channelIndex > -1) {
                    return (
                      <ChannelsInHome
                        channelIndex={channelIndex}
                        drizzle={drizzle}
                        drizzleState={drizzleState}
                        clickChannel={this.props.clickChannel}
                        key={channelIndex}
                      />
                    );
                  }
                  return "";
                })
                .reverse()
            ) : (
              <div>No Search Results!</div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
