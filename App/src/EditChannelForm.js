import React, { Component } from 'react';
import { Button, Form, Message, Modal, Icon, Input } from 'semantic-ui-react';

const defaultState = {
  addressToAdd: '',
  loading: false,
};
export default class EditChannelForm extends Component {
  constructor() {
    super();
    this.state = { ...defaultState, membersArray: [], showModal: false };
  }
  async componentDidMount() {
    const membersArray = await this.props.drizzle.contracts.DappChat.methods
      .getMembersArray(this.props.channelIndex)
      .call();

    this.props.drizzle.contracts.DappChat.methods.getMembersArray.cacheCall(
      this.props.channelIndex
    );

    this.setState({
      membersArray,
      currentAddress: this.props.drizzleState.accounts[0],
    });

    //extra address to test
    //     '0x83903Dfc4CD678B8c3D726CBA3Fc35156f55062E'
  }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal, errorMessage: '' });
  };

  clearErrorMessage = () => {
    this.setState({ errorMessage: '' });
  };

  removeMember = async (address, memberIndex) => {
    this.setState({ loading: true });
    this.props.openToast();
    try {
      await this.props.drizzle.contracts.DappChat.methods
        .removeChannelMembers(this.props.channelIndex, address, memberIndex)
        .send({ from: this.state.userAddress });
      this.clearErrorMessage();
    } catch (error) {
      this.props.closeToast();
      this.setState({ errorMessage: error.message });
    }
    this.props.closeToast();
    this.setState(defaultState);
  };

  addMember = async () => {
    this.setState({ loading: true });
    this.props.openToast();
    try {
      await this.props.drizzle.contracts.DappChat.methods
        .addChannelMembers(this.props.channelIndex, this.state.addressToAdd)
        .send({ from: this.state.userAddress });
      this.clearErrorMessage();
    } catch (error) {
      this.props.closeToast();
      this.setState({ errorMessage: error.message });
    }
    this.props.closeToast();
    this.setState(defaultState);
  };

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  updateMembersArray() {
    const key = Object.keys(
      this.props.drizzleState.contracts.DappChat.getMembersArray
    )[0];
    if (key) {
      return this.props.drizzleState.contracts.DappChat.getMembersArray[key]
        .value;
    }
    return [];
  }

  render() {
    const currentMembersArray = this.updateMembersArray();
    return (
      <div>
        <Modal
          open={this.state.showModal}
          trigger={
            <Button primary onClick={this.toggleModal} className="item">
              Edit Members
            </Button>
          }
        >
          <Modal.Header>Admin</Modal.Header>
          <Icon name={'close'} onClick={this.toggleModal} />
          <Form onSubmit={this.addMember} error={!!this.state.errorMessage}>
            <Input
              key="addressToAdd"
              name="addressToAdd"
              value={this.state.addressToAdd}
              placeholder="Address to Add"
              onChange={this.handleInputChange}
            />
            <Message error header="Oops!" content={this.state.errorMessage} />

            <Button loading={this.state.loading} disabled={this.state.loading}>
              Submit
            </Button>
          </Form>

          <ul>
            {currentMembersArray.length === 0 ? (
              <div>There are no allowed members!</div>
            ) : (
              currentMembersArray.map((member, idx) => {
                //Needs to check if address is empty to delete from correct member index
                if (member !== '0x0000000000000000000000000000000000000000') {
                  return (
                    <li key={idx}>
                      Member Address: {member}
                      <Icon
                        name={'close'}
                        className={'closeBtn'}
                        onClick={() => this.removeMember(member, idx)}
                      />
                    </li>
                  );
                } else return '';
              })
            )}
          </ul>
        </Modal>
      </div>
    );
  }
}
