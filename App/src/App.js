import React from 'react';
import { DrizzleContext } from 'drizzle-react';
import HomePage from './HomePage';
import backgroundImage from './assets/Background.max-2800x2800.jpg';
import { Loader } from 'semantic-ui-react';

export default () => (
  <DrizzleContext.Consumer>
    {drizzleContext => {
      const { drizzle, drizzleState, initialized } = drizzleContext;

      if (!initialized) {
        return (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <h1>Loading...</h1>
            <Loader size="massive" active inline />
          </div>
        );
      }
      return (
        <div
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'contain',
          }}
        >
          <HomePage drizzle={drizzle} drizzleState={drizzleState} />
        </div>
      );
    }}
  </DrizzleContext.Consumer>
);
