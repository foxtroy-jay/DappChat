import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ContractData, ContractForm } from 'drizzle-react-components';
import web3 from './web3'
import twittor from './twittor'
// import store from '../../contracts/Twittor.sol';

export default class tweets extends React.Component{


  render() {
      let length = 0;
      const userAddress = this.props.accounts[0];
      const getNumTweetsFirstKey = Object.keys(this.props.Twittor.getNumTweets)[0]
      if (this.props.Twittor.getNumTweets[getNumTweetsFirstKey]) {
        length = this.props.Twittor.getNumTweets[getNumTweetsFirstKey].value;
      }
      console.log('length ', length)
      let mapArray = []
      if(length) {
    mapArray.length = length
    mapArray.fill(1)  
    }

    
    
      
      return (
    <div className="App">
      <ToastContainer />
      
      <div>
        <h1>TWEETS</h1>

    <ContractForm contract="Twittor" method="addTweetStruct" />
   
  

    
    <div className = "allTweets">
    {mapArray.map((tweet, idx) => {
      return <div className = "singleTweet"><ContractData contract="Twittor" method="getTweetStruct" 
      methodArgs = {[userAddress,idx]}
      key={idx}/></div>
    }).reverse()
        }</div>

    {/* <div>
    <h1>FETCH USER TWEETS</h1>
    <ContractData contract="Twittor" method="fetchUserTweets" methodArgs = {["0x42d83DC64F5DbDFd4eff8A0B36f7c64ddd24B256"]} />

    </div> */}

<div className = "hide">
      {<ContractData  contract="Twittor" method="getNumTweets" methodArgs = {[userAddress]}/>}

   </div>



      </div>
    </div>
    )
  }
 };