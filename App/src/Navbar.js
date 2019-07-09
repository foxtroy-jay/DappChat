import React from 'react';
import { Link } from 'react-router-dom';
// import { Menu, SearchResult, SearchResults, Search } from 'semantic-ui-react';
import { Input } from 'semantic-ui-react';
import EditAlias from './EditAlias';
// import SearchPage from './SearchResults';
import { toast, Flip } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import logo from './assets/dappChat.jpg';

export default class Navbar extends React.Component {
  constructor() {
    super();
    this.state = { search: '' };
  }

  handleInputChange = event => {
    this.setState({ search: event.target.value });
  };

  openToast = () => {
    toast.info('Processing change...', {
      position: 'top-right',
      autoClose: 10000,
      transition: Flip,
    });
  };

  closeToast = () => {
    toast.dismiss();
  };

  render() {
    return (
      <div className="ui secondary  menu">
        <ToastContainer />
        <div className="item">
          <Link to="/home">
            {' '}
            <img src={logo} alt="dappChat logo" className="logo" />{' '}
          </Link>
        </div>
        <div className="item">Explore</div>
        <EditAlias
          drizzle={this.props.drizzle}
          openToast={this.openToast}
          closeToast={this.closeToast}
        />

        <div className="right menu">
          <div className="item">
            <div className="ui icon input">
              <Input
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
