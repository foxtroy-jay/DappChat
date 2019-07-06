import MyComponent from './MyComponent';
import { drizzleConnect } from 'drizzle-react';

const mapStateToProps = state => ({
  accounts: state.accounts,
  DappChat: state.contracts.DappChat,
  drizzleStatus: state.drizzleStatus,
});

const MyContainer = drizzleConnect(MyComponent, mapStateToProps);

export default MyContainer;
