import React from 'react';
import EditAlias from './EditAlias';
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
      <div id="navbarStyle" className="ui navbarStyle three item inverted menu">
        <ToastContainer />
        <div className="item">
          <div>
            <img className="logo" alt="dappChat" src={logo} />
          </div>
        </div>
        <div className="item" />
        <EditAlias
          drizzle={this.props.drizzle}
          openToast={this.openToast}
          closeToast={this.closeToast}
          id="editAliasButton"
        />
      </div>
    );
  }
}
