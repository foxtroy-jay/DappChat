import Migrations from "./contracts/Migrations.json";
import Twittor from "./contracts/Twittor.json";

const options = {
  // web3: {
  //   block: false,
  //   fallback: {
  //     type: "ws",
  //     url: "ws://127.0.0.1:9545",
  //   },
  // },
  contracts: [Migrations, Twittor],
  // events: {
  //   Twittor: ["Tweet"],
  // },
  polls: {
    // set polling interval to 30secs so we don't get buried in poll events
    accounts: 30000,
  },
};

export default options;
