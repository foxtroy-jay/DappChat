import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ContractData, ContractForm } from 'drizzle-react-components';
// import web3 from './web3'

export default tweets => {
  // console.log(tweets['Twittor']['getMessageLength']['0x0'], 'TWEETS')
  // console.log(web3, 'WEB3')
  let length = tweets['Twittor']['getMessageLength']['0x0'];
  console.log('length ', length)
  let mapArray = []
  if(length) {
    // console.log(length.value, 'lENGTH')
mapArray.length = (length.value)
mapArray.fill(1)  
console.log(mapArray, 'lENGTH')

}

  
  return (
 <div className="App">
   <ToastContainer />
   
   <div>
     <h1>TWEETS</h1>

<ContractForm contract="Twittor" method="setMessage" />

<div className = "allTweets">
{mapArray.map((tweet, idx) => {
  return <div className = "singleTweet"><ContractData contract="Twittor" method="getMessageByIndex" 
  methodArgs = {[idx]}
  key={idx}/></div>
}).reverse()
    }</div>

{/* <div>
<h1>FETCH USER TWEETS</h1>
<ContractData contract="Twittor" method="fetchUserTweets" methodArgs = {["0x42d83DC64F5DbDFd4eff8A0B36f7c64ddd24B256"]} />

</div> */}
<div className = "hide">
{<ContractData  contract="Twittor" method="getMessageLength"/>}

</div>


   </div>
 </div>
)};