import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import EditAlias from './EditAlias';

export default class Navbar extends React.Component {
  constructor() {
    super();
  }

  async componentDidMount () {
      const accounts = await this.props.drizzle.web3.eth.getAccounts();
    }

  render() {
    return (
      <div className="ui secondary  menu">
        <div className="item">
          <Link to="/home">Home </Link>
        </div>
        <a className="item">Explore</a>
        <EditAlias drizzle = {this.props.drizzle}/>
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
