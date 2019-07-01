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
     <ContractData contract="Twittor" method="getKeys" />
     <ContractForm contract="Twittor" method="setMessage" />
   </div>
 </div>
);