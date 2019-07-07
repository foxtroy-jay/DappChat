import Home from './Home';
import { drizzleConnect } from 'drizzle-react';

const mapStateToProps = state => ({
  accounts: state.accounts,
  DappChat: state.contracts.DappChat,
  drizzleStatus: state.drizzleStatus,
});

const MyContainer = drizzleConnect(Home, mapStateToProps);

export default MyContainer;
