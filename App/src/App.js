import MyComponent from './MyComponent';
import React from 'react';
import { DrizzleContext } from 'drizzle-react';

export default () => (
  <DrizzleContext.Consumer>
    {drizzleContext => {
      const { drizzle, drizzleState, initialized } = drizzleContext;

      if (!initialized) {
        return <h1>'Loading...'</h1>;
      }
      return (
        <div>
          <MyComponent drizzle={drizzle} drizzleState={drizzleState} />
        </div>
      );
    }}
  </DrizzleContext.Consumer>
);
