import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Drizzle } from 'drizzle';
import { DrizzleContext } from 'drizzle-react';
import './App.css';

import Migrations from './contracts/Migrations.json';
import Twittor from './contracts/Twittor.json';

import store from './middleware';

import Routes from './routes';
import { Router } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
const options = { contracts: [Migrations, Twittor] };
// const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, store);

ReactDOM.render(
  <DrizzleContext.Provider drizzle={drizzle}>
    <BrowserRouter>
      <Routes drizzle={drizzle} />
    </BrowserRouter>
    {/* <App /> */}
  </DrizzleContext.Provider>,

  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
