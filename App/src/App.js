import React from 'react';
import { DrizzleContext } from 'drizzle-react';
import HomePage from './HomePage';

export default () => (
  <DrizzleContext.Consumer>
    {drizzleContext => {
      const { drizzle, drizzleState, initialized } = drizzleContext;

      if (!initialized) {
        return <h1>'Loading...'</h1>;
      }
      return (
        <div>
          <HomePage drizzle={drizzle} drizzleState={drizzleState} />
        </div>
      );
    }}
  </DrizzleContext.Consumer>
);
