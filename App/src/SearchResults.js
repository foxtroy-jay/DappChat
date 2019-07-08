import React from 'react';
// import ChannelDetails from './ChannelDetails';
import ChannelsInHome from './ChannelsInHome';

const wordsToIgnore = [
  'at',
  'for',
  'in',
  'off',
  'on',
  'over',
  'and',
  'under',
  'of',
  'the',
  'is',
  'a',
];

export default class SearchResult extends React.Component {
  constructor() {
    super();
    this.state = {
      results: [],
    };
  }

  componentDidMount() {
    this.props.drizzle.contracts.DappChat.methods.getAllChannelsLength.cacheCall();
    this.search();
  }

  search = async () => {
    let channelsLength = this.props.drizzleState.contracts.DappChat
      .getAllChannelsLength['0x0'].value;

    const searchWords = this.props.props.location.state.search
      .toLowerCase()
      .split(' ')
      .filter(word => {
        return !wordsToIgnore.includes(word);
      });

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
    return (
      <div>
        {results.map(idx => {
          return (
            <ChannelsInHome
              channelIndex={idx}
              drizzle={this.props.drizzle}
              drizzleState={this.props.drizzleState}
              key={idx}
            />
          );
        })}
      </div>
    );
  }
}
