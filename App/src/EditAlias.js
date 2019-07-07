import React from 'react';
import { toast, Flip } from 'react-toastify';
import { Button, Form, Message, Modal, Icon } from 'semantic-ui-react';

const defaultState = {
  Alias: '',
  loading: false,
  errorMessage: '',
  userAddress: '',
  showModal: false,
};

export default class EditAliasForm extends React.Component {
  constructor() {
    super();
    this.state = defaultState;
  }

  async componentDidMount() {
    if (!this.state.userAddress) {
      const accounts = await this.props.drizzle.web3.eth.getAccounts();
      this.setState({ userAddress: accounts[0] });
    }
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = async (event) => {
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

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  render() {
    return (
      <Modal
        open={this.state.showModal}
        trigger={
          <a onClick={this.toggleModal} className="item">
            Edit Alias
          </a>
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
          <Button primary loading={this.state.loading}>
            Change Alias
          </Button>
        </Form>
      </Modal>
    );
  }
}
