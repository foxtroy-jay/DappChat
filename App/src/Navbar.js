import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, SearchResult, SearchResults, Search } from 'semantic-ui-react';
import EditAlias from './EditAlias';
import SearchPage from './SearchResults';

export default class Navbar extends React.Component {
  constructor() {
    super();
    this.state = { search: '' };
  }

  async componentDidMount() {
    const accounts = await this.props.drizzle.web3.eth.getAccounts();
  }

  handleInputChange = event => {
    this.setState({ search: event.target.value });
  };

  handle;

  render() {
    return (
      <div className="ui secondary  menu">
        <div className="item">
          <Link to="/home">Home </Link>
        </div>
        <a className="item">Explore</a>
        <EditAlias drizzle={this.props.drizzle} />
        <div className="right menu">
          <div className="item">
            <div className="ui icon input">
              <input
                type="text"
                placeholder="Search..."
                onChange={this.handleInputChange}
                value={this.state.search}
              />
              <Link
                to={{
                  pathname: '/searchresults',
                  state: { search: this.state.search },
                }}
              >
                <i className="search link icon" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
