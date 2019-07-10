import { DrizzleContext } from "drizzle-react";
import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";

import AddChannelForm from "./AddChannelForm";
import Navbar from "./Navbar";
import SearchResults from "./SearchResults";
import Channel from "./Channel";
import HomePage from "./HomePage";

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
              <Navbar drizzle={drizzle} drizzleState={drizzleState} />

              <Switch>
                <Route
                  exact
                  path="/searchresults"
                  render={props => {
                    return (
                      <SearchResults
                        drizzle={drizzle}
                        drizzleState={drizzleState}
                        props={props}
                      />
                    );
                  }}
                />
                <Route
                  exact
                  path="/channel"
                  render={props => {
                    return (
                      <Channel
                        drizzle={drizzle}
                        drizzleState={drizzleState}
                        props={props}
                      />
                    );
                  }}
                />
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
                  path="/"
                  render={props => {
                    return (
                      <HomePage
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
