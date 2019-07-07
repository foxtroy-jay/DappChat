import { DrizzleContext } from 'drizzle-react';
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';

import UserPage from './UserPage';
import AddChannelForm from './AddChannelForm';
import Navbar from './Navbar';


export default class Routes extends Component {
  render() {
    return (
      <DrizzleContext.Consumer>
        {drizzleContext => {
          const { drizzle, drizzleState, initialized } = drizzleContext;

          if (!initialized) {
            return <h1>'Loading...'</h1>;
          }
          return (
            <div>
                     <Navbar 
      drizzle = {drizzle}
      drizzleState={drizzleState}
      /> 

              <Switch>
                <Route
                  exact
                  path="/addChannel"
                  render={props => {
                    return (
                      <AddChannelForm
                        drizzle={drizzle}
                        drizzleState={drizzleState}
                        props={props}
                      />
                    );
                  }}
                />
                <Route
                  exact
                  path="/userpage"
                  render={props => {
                    return (
                      <UserPage
                        drizzle={drizzle}
                        drizzleState={drizzleState}
                        props={props}
                      />
                    );
                  }}
                />
                <Route
                  exact
                  path="/"
                  render={props => {
                    return (
                      <Home
                        drizzle={drizzle}
                        drizzleState={drizzleState}
                        props={props}
                      />
                    );
                  }}
                />
                <Route
                  exact
                  path="/:address"
                  render={props => (
                    <Home
                      drizzle={drizzle}
                      drizzleState={drizzleState}
                      props={props}
                    />
                  )}
                />
              </Switch>
            </div>
          );
        }}
      </DrizzleContext.Consumer>
    );
  }
}
