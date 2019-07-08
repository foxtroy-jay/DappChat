import React from 'react';

import { Button, Form, Message, Modal, Icon } from 'semantic-ui-react';

const defaultState = {
  Alias: '',
  loading: false,
  userAddress: '',
};

export default class EditAliasForm extends React.Component {
  constructor() {
    super();
    this.state = { ...defaultState, showModal: false };
  }

  async componentDidMount() {
    if (!this.state.userAddress) {
      const accounts = await this.props.drizzle.web3.eth.getAccounts();
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
    this.props.openToast();
    try {
      await this.props.drizzle.contracts.DappChat.methods
        .setAlias(this.state.Alias)
        .send({ from: this.state.userAddress });
      this.setState({ showModal: false });
    } catch (error) {
      this.setState({ errorMessage: error.message });
      this.props.closeToast();
    }
    this.setState(defaultState);
    this.props.closeToast();
  };

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal, errorMessage: '' });
  };

  clearErrorMessage = () => {
    this.setState({ errorMessage: '' });
  };

  render() {
    return (
      <Modal
        open={this.state.showModal}
        trigger={
          <div onClick={this.toggleModal} className="item">
            Edit Alias
          </div>
        }
      >
        <Modal.Header>Edit Alias</Modal.Header>
        <Icon name={'close'} onClick={this.toggleModal} />
        <Form onSubmit={this.handleSubmit} error={!!this.state.errorMessage}>
          <input
            key="Alias"
            name="Alias"
            value={this.state.Alias}
            placeholder="Alias"
            onChange={this.handleInputChange}
          />

          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button
            primary
            loading={this.state.loading}
            disabled={this.state.loading}
          >
            Change Alias
          </Button>
        </Form>
      </Modal>
    );
  }
}
