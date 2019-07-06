// import React from 'react';
// import logo from './logo.svg';
// import './App.css';
// import web3 from './web3';
// import Stealth from './Stealth';

// class App extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       tweets: [],
//       newTweet: '',
//     };
//   }

//   async componentDidMount() {
//     try {
//       const accounts = await web3.eth.getAccounts();
//       const tweets = await Stealth.methods.fetchUserTweets(accounts[0]).call();

//       this.setState({ tweets });
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   handleChange = evt => {
//     this.setState({
//       [evt.target.name]: evt.target.value,
//     });
//   };

//   handleTweet = async evt => {
//     try {
//       evt.preventDefault();
//       //get current account logged in
//       const accounts = await web3.eth.getAccounts();
//       //send tweet out
//       await Stealth.methods
//         .setMessage(this.state.newTweet)
//         .send({ from: accounts[0] });
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   render() {
//     const tweets = this.state.tweets;
//     return (
//       <div className="App">
//         <input
//           name="newTweet"
//           type="text"
//           value={this.state.newTweet}
//           onChange={this.handleChange}
//         />
//         <button type="button" onClick={this.handleTweet}>
//           {' '}
//           TWEET
//         </button>
//         <h1> {this.state.message}</h1>
//         <div>
//           <h1>TWEETS</h1>
//           {tweets.map(tweet => {
//             return <div>{tweet}</div>;
//           })}
//         </div>
//       </div>
//     );
//   }
// }

import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ContractData, ContractForm } from 'drizzle-react-components';

export default tweets => (
  <div className="App">
    <ToastContainer />
    <h1> Please just work</h1>
    <div>
      <h1>TWEETS</h1>
      <ContractData contract="Stealth" method="getKeys" />
      <ContractForm contract="Stealth" method="setMessage" />
    </div>
  </div>
);
