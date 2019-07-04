import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ContractData, ContractForm} from 'drizzle-react-components';
import TweetForm from './TweetForm';
import SingleTweet from './SingleTweet';
import { Drizzle } from 'drizzle';
import options from './drizzleOptions';
import { DrizzleContext } from "drizzle-react";

// const drizzle = new Drizzle(options);
export default class tweets extends React.Component {
  constructor(props, context) {
    super(props);
    this.drizzleState = context.drizzle
    // this.contractInstance = context.drizzle.contracts.Twittor
    this.state = { userAddress: '',
    tweet: "",
    hashT: "",
    numTweets: 0,
    dataKey: null
  };

  }
  async componentDidMount() {
    // console.log("drizzle ", drizzle)
    const {drizzle} = this.props;

    const accounts = await this.props.drizzle.web3.eth.getAccounts();
    // const numTweets = await this.props.drizzle.contracts.Twittor.methods.getNumTweets(accounts[0]).call();
    
    // Initializes getNumTweets of store state 
    // getNumTweets is initially an empty object so this call sets it to however
    // many tweets the current address passed to it has
    drizzle.contracts.Twittor.methods.getNumTweets.cacheCall(accounts[0])
    
    // let numTweets = 0;
    

    // console.log("numTweets ", numTweets)
    this.setState({ userAddress: accounts[0] });
    // const contract = ;

    // drizzle.contracts.Twittor.methods.getNumTweets.cacheCall(accounts[0])
    // this.setState({dataKey});

    // console.log("KEY ", dataKey)
  }

  handleInputChange = (event) => {
    this.setState({
      tweet: event.target.value,
      hashT: this.findHashTag(event.target.value),
    });
    console.log(this.state);
  }

  handleSubmit = async (event) => {
  event.preventDefault();


  await this.props.drizzle.contracts.Twittor.methods.addTweetStruct(this.state.tweet, this.state.hashT).send({from: this.state.userAddress})

  

  //  this.forceUpdate();
//const numTweets = await this.props.drizzle.contracts.Twittor.methods.getNumTweets(this.state.userAddress).call();
//this.setState({numTweets });

    
}

 getTweet = async (index) => {
  console.log("props ", this.props)
  const result =  await this.props.drizzle.contracts.Twittor.methods.getEverythingTweetStruct(this.state.userAddress, index).call();
  
  return result[0];
}

getNum = async (index) => {
  console.log("props ", this.props)
  const numTweets = await this.props.drizzle.contracts.Twittor.methods.getNumTweets(this.state.userAddress).call();
  this.setState({numTweets})
  console.log("numTweets", numTweets);
  this.forceUpdate();
}

findHashTag(str) {
  return str.split(' ').filter(word => {
    return word[0] === '#';
  })[0];
}

  render() {

    const {drizzleState} = this.props;
    let length = 0;

    const key = Object.keys(drizzleState.contracts.Twittor.getNumTweets)[0]
    //if getNumTweets has been initialized then set length to equal getNumTweets
    if(drizzleState.contracts.Twittor.getNumTweets[key]){  
      length = drizzleState.contracts.Twittor.getNumTweets[key].value;
    }

    // const getNumTweetsFirstKey = Object.keys(
    //   this.props.drizzleState.contracts.Twittor.getNumTweets
    // )[1];
    // if (this.props.drizzleState.contracts.Twittor.getNumTweets[getNumTweetsFirstKey]) {
    //   length = this.props.drizzleState.contracts.Twittor.getNumTweets[getNumTweetsFirstKey].value;
    // }
    let mapArray = [];
    if (length) {
      mapArray.length = length;
      mapArray.fill(1);
    }
    

    console.log("props", this.props)
    console.log("drizzleState>>>>", this.props.drizzle.store.getState())
    // console.log("contractInstance>>>>>", this.contractInstance)
    return (
      <div className="App">
        <ToastContainer />
        {<h1>{length} </h1>}
        <div>
          <button onClick = {this.getTweet} >GET TWEET</button>
          <button onClick = {this.getNum} >GET Numtweets</button>

          <h1>TWEETS</h1>
          <form onSubmit = {this.handleSubmit}>
          <input
              key="tweet"
              name="tweet"
              value={this.state.tweet}
              placeholder="tweet"
              onChange={this.handleInputChange}
            />
            <button type="submit">TWEET</button>
          </form>
          {/* <TweetForm contract="Twittor" method="addTweetStruct" store = {this.props.drizzle}/> */}
          <div className="allTweets">
            {mapArray
              .map((tweet, idx) => {
                return (
                  <SingleTweet
                    address={this.state.userAddress}
                    index={idx}
                    key={idx}
                  />
                );
              })
              .reverse()}
          </div>
          <div className="hide">
            {/* {
              <ContractData
                contract="Twittor"
                method="getNumTweets"
                methodArgs={[this.state.userAddress]}
              />
            } */}
          </div>

          {/* (
  <DrizzleContext.Consumer>
    {drizzleContext => {
      const { drizzle, drizzleState, initialized } = drizzleContext;
  
      if (!initialized) {
        return "Loading...";
      }

      return (
      <div>
      <TweetForm drizzle = {drizzle} drizzleState = {drizzleState} />
      </div>

      );
    }}
  </DrizzleContext.Consumer>
) */}
        </div>
      </div>
    );
  }
}
