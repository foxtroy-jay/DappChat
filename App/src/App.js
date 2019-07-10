import React from 'react';
import { DrizzleContext } from 'drizzle-react';
import HomePage from './HomePage';
import backgroundImage from './assets/Background.max-2800x2800.jpg';
export default () => (
  <DrizzleContext.Consumer>
    {(drizzleContext) => {
      const { drizzle, drizzleState, initialized } = drizzleContext;

      if (!initialized) {
        return <h1>'Loading...'</h1>;
      }
      return (
        <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'contain' }}>
          <HomePage drizzle={drizzle} drizzleState={drizzleState} />
        </div>
      );
    }}
  </DrizzleContext.Consumer>
);
