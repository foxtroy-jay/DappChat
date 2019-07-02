import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ContractData, ContractForm } from 'drizzle-react-components';
import web3 from './web3'
import twittor from './twittor'
// import store from '../../contracts/Twittor.sol';

export default class tweets extends React.Component{
  constructor(props){
    super(props);
  }

  componentWillMount() {
    const {tweets} = this.props;
    // const user = tweets;
    // console.log("user", user);
    console.log("tweets ", this.props)
  }

  render() {
        // console.log(tweets['Twittor']['getMessageLength']['0x0'], 'TWEETS')
      // console.log(web3, 'WEB3')
      let length =0;
      console.log('getnumtweets ', this.props.Twittor )
      if (this.props.Twittor.getNumTweets["0x0"]) {
        length = this.props.Twittor.getNumTweets["0x0"].value;
      }
      console.log('length ', length)
      let mapArray = []
      if(length) {
        // console.log(length.value, 'lENGTH')
    mapArray.length = length
    mapArray.fill(1)  
    console.log(mapArray, 'lENGTH')
    }

    const userAddress = this.props.accounts[0];
    console.log("address",  userAddress);
    
      
      return (
    <div className="App">
      <ToastContainer />
      
      <div>
        <h1>TWEETS</h1>

    <ContractForm contract="Twittor" method="addStructMessage" />

    <div className = "allTweets">
    {mapArray.map((tweet, idx) => {
      return <div className = "singleTweet"><ContractData contract="Twittor" method="getStructMessage" 
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