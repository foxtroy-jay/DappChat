// import React from 'react';
// // import logo from './logo.svg';
// import './App.css';
// // import web3 from './web3';
// // import twittor from './twittor';

// import { DrizzleProvider } from "drizzle-react";
// import { LoadingContainer } from "drizzle-react-components";
// import {Drizzle, generateStore} from 'drizzle'
// import { DrizzleContext } from "drizzle-react";
// import "./App.css";

// import Migrations from "./contracts/Migrations.json";
// import Twittor from "./contracts/Twittor.json";

// import drizzleOptions from "./drizzleOptions";
// import MyContainer from "./MyContainer";
// import store from './middleware'
// const options = {contracts: [Migrations, Twittor]};
// const drizzleStore = generateStore(options);
// const drizzle = new Drizzle(options, drizzleStore);




// class App extends React.Component {
  // constructor() {
  //   super();
  //   this.state ={
  //     tweets: [],
  //     newTweet: '',
  //   }
  // }

  // async componentDidMount() {
  //   try {
  //     const accounts = await web3.eth.getAccounts()
  //     const tweets = await twittor.methods.fetchUserTweets(accounts[0]).call();
  //     if(tweets !== null ){
  //     this.setState({tweets});

  //     }
  //   } catch (err) {
  //     console.log(err)
  //   }
   
  // }

  // handleChange = (evt) => {
  //   this.setState({
  //     [evt.target.name]: evt.target.value
  //   })
  // }

  // handleTweet = async (evt) => {
  //   try {
  //     evt.preventDefault();
  //     //get current account logged in
  //     const accounts = await web3.eth.getAccounts()
  //     //send tweet out
  //     await twittor.methods.setMessage(this.state.newTweet)
  //       .send({from: accounts[0]})
  //       .on('transactionHash', function(hash){
  //         console.log(hash);
  // })
      
  //   } catch (err) {
  //     console.log(err)
  //   }
    
  // }


  // render() {
  //   const tweets = this.state.tweets;
  //   return (
  //     <div className="App">
  //       <input
  //         name = "newTweet"
  //         type = "text"
  //         value = {this.state.newTweet}
  //         onChange = {this.handleChange}
  //       />
  //       <button
  //         type = "button"
  //         onClick = {this.handleTweet}
  //       > TWEET</button>
  //       <h1> {this.state.message}</h1>
  //       <div className = 'allTweets'>
  //         <h1>TWEETS</h1>
  //         {tweets.map(tweet => {
  //           return(
  //           <div className = 'singleTweet'>{tweet}</div>
  //           )
  //         })}
  //       </div>
  //     </div>
  //   );
  // }
 
//   render() {
//     return (
//       <DrizzleProvider store={store} options={drizzleOptions}>
//         <LoadingContainer>
//           <MyContainer />
//         </LoadingContainer>
//       </DrizzleProvider>
//     );
//   }
// }



// export default App;


import MyComponent from './MyComponent'
import React from "react";
import { DrizzleContext } from "drizzle-react";
import TweetForm from './TweetForm';

export default () => (
  <DrizzleContext.Consumer>
    {drizzleContext => {
      const { drizzle, drizzleState, initialized } = drizzleContext;
  
      if (!initialized) {
        return "Loading...";
      }
      return (
      <div>
              <MyComponent drizzle={drizzle} drizzleState={drizzleState} />
      </div>

      );
    }}
  </DrizzleContext.Consumer>
)