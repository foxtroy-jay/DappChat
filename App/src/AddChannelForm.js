import React from 'react';
import { toast, Flip } from 'react-toastify';
import { Button, Form, Message, Modal, Icon } from 'semantic-ui-react';

const defaultState = {
  channelName: '',
  category: '',
  restrictedStatus: false,
  loading: false,
  userAddress: '',
};

export default class AddChannelForm extends React.Component {
  constructor() {
    super();
    this.state = { ...defaultState, errorMessage: '', showModal: false };
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
    toast.info('Processing change...', {
      position: 'top-right',
      autoClose: 10000,
      transition: Flip,
    });
    try {
      await this.props.drizzle.contracts.DappChat.methods
        .addChannelStruct(
          this.state.channelName,
          this.state.category,
          this.state.restrictedStatus
        )
        .send({ from: this.state.userAddress });
      this.toggleModal();
    } catch (error) {
      this.setState({ errorMessage: error.message });
      toast.dismiss();
    }

    this.setState(defaultState);
  };

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal, errorMessage: '' });
  };

  render() {
    return (
      <div>
        <Modal
          open={this.state.showModal}
          trigger={
            <Button className = "createChannelBtn" onClick={this.toggleModal}>Create A New Channel</Button>
          }
        >
          <Modal.Header>Create A New Channel</Modal.Header>
          <Icon name={'close'} onClick={this.toggleModal} />
          <Form onSubmit={this.handleSubmit} error={!!this.state.errorMessage}>
            <input
              key="channelName"
              name="channelName"
              value={this.state.channelName}
              placeholder="Channel Name"
              onChange={this.handleInputChange}
            />
            <input
              key="category"
              name="category"
              value={this.state.category}
              placeholder="Channel Category"
              onChange={this.handleInputChange}
            />
            <select
              key="restrictedStatus"
              name="restrictedStatus"
              value={this.state.restrictedStatus}
              placeholder="Select"
              onChange={this.handleInputChange}
            >
              <option value={true}>True</option>
              <option value={false}>False</option>
            </select>
            <Message error header="Oops!" content={this.state.errorMessage} />
            <Button
              primary
              loading={this.state.loading}
              disabled={this.state.loading}
            >
              Create New Channel
            </Button>
          </Form>
        </Modal>
      </div>
    );
  }
}
