// import Twittor from './Twittor.sol';
import Twittor from './twittor.js';

const options = {
  web3: {
    block: false,
    fallback: {
      type: 'ws',
      url: 'ws://127.0.0.1:9545',
    },
  },
  contracts: [Twittor],
  events: {
    Twittor: ['Twittor'],
  },
  polls: {
    // set polling interval to 30secs so we don't get buried in poll events
    accounts: 30000,
  },
};

export default options;
