import React from 'react';
import { ToastContainer, toast, Flip } from 'react-toastify';
import { Button, Form, Message, Modal } from 'semantic-ui-react';

const defaultState = {
  Alias: '',
  loading: false,
  errorMessage: '',
  userAddress: '',
};

export default class EditAliasForm extends React.Component {
  constructor(props) {
    super();
    this.state = defaultState;
  }

  async componentDidMount() {
    if (!this.state.userAddress) {
      const accounts = await this.props.drizzle.web3.eth.getAccounts();
      //const alias = await this.props.drizzle.web3.eth.
      //console.log('LOOOKHERE', this.state.drizzle.web3.eth);
      this.setState({ userAddress: accounts[0] });
    }
  }

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ loading: true });
    toast.info('Processing tweet...', {
      position: 'top-right',
      autoClose: 10000,
      transition: Flip,
    });
    try {
      await this.props.drizzle.contracts.DappChat.methods
        .setAlias(this.state.Alias)
        .send({ from: this.state.userAddress });
    } catch (error) {
      this.setState({ errorMessage: error.message });
      toast.dismiss();
    }

    this.setState(defaultState);
  };

  render() {
    return (
      <Modal trigger={<a className="item">Edit Alias</a>}>
        <Modal.Header>Edit Alias</Modal.Header>
        <Form onSubmit={this.handleSubmit} error={!!this.state.errorMessage}>
          <input
            key="Alias"
            name="Alias"
            value={this.state.Alias}
            placeholder="Alias"
            onChange={this.handleInputChange}
          />

          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button primary loading={this.state.loading}>
            Change Alias
          </Button>
        </Form>
      </Modal>
    );
  }
}
