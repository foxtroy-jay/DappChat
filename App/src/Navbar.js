import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

export default class Navbar extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="ui secondary  menu">
        <Link to="/home">
          <a className="active item">Home</a>
        </Link>
        <a className="item">Explore</a>
        <a className="item"> Edit Alias</a>
        <div className="right menu">
          <div className="item">
            <div className="ui icon input">
              <input type="text" placeholder="Search..." />
              <i className="search link icon" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
