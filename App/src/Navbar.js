import React from 'react';
// import { Menu, SearchResult, SearchResults, Search } from 'semantic-ui-react';
import EditAlias from './EditAlias';
// import SearchPage from './SearchResults';
import { toast, Flip } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

export default class Navbar extends React.Component {
  constructor() {
    super();
    this.state = { search: '' };
  }

  // async componentDidMount() {
  //   const accounts = await this.props.drizzle.web3.eth.getAccounts();
  // }

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
    const { toggleSidebar } = this.props;

    return (
      <div className="ui secondary  menu">
        <ToastContainer />

        <div className="item">
          <div> Home</div>
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
              <i
                // onClick={() => console.log('thisworking?')}
                onClick={toggleSidebar}
                className="search link icon"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
