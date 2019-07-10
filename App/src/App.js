import React from "react";
import { DrizzleContext } from "drizzle-react";
import { Loader } from "semantic-ui-react";
import HomePage from "./HomePage";

export default () => (
  <DrizzleContext.Consumer>
    {drizzleContext => {
      const { drizzle, drizzleState, initialized } = drizzleContext;

      if (!initialized) {
        return (
          <div>
            <h1 align="center">Loading...</h1>
            <Loader active inline="centered" size="massive" />
          </div>
        );
      }
      return (
        <div>
          <HomePage drizzle={drizzle} drizzleState={drizzleState} />
        </div>
      );
    }}
  </DrizzleContext.Consumer>
);
