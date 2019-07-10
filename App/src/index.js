import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Drizzle } from 'drizzle';
import { DrizzleContext } from 'drizzle-react';
import './App.css';
import Migrations from './contracts/Migrations.json';
import DappChat from './contracts/DappChat.json';
import store from './middleware';

const options = { contracts: [Migrations, DappChat] };
const drizzle = new Drizzle(options, store);

ReactDOM.render(
  <DrizzleContext.Provider drizzle={drizzle}>
    <App />
  </DrizzleContext.Provider>,

  document.getElementById('root')
);

serviceWorker.unregister();
