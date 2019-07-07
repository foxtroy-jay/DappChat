import { DrizzleContext } from 'drizzle-react';
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';

import UserPage from './UserPage';
import AddChannelForm from './AddChannelForm';

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
                    // console.log('/userpage ran');
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
                    // console.log('/ ran');
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
