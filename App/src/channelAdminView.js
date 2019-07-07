import React, { Component } from 'react';
import { Button, Form, Message, Modal, Icon } from 'semantic-ui-react';

const defaultState = {
  showModal: false,
  membersArray: [],
};
export default class channelAdminView extends Component {
  constructor() {
    super();
    this.state = defaultState;
  }
  async componentDidMount() {
    const membersArray = await this.props.drizzle.contracts.DappChat.methods
      .getMembersArray(this.props.channelIndex)
      .call();
    console.log(this.props.drizzleState.accounts[0]);
    this.setState({
      membersArray,
      currentAddress: this.props.drizzleState.accounts[0],
    });
    this.props.drizzle.contracts.DappChat.methods.getMembersArray.cacheCall(this.props.channelIndex);
    console.log(this.state);
  }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  removeMember = async (address, memberIndex) => {
    await this.props.drizzle.contracts.DappChat.methods.removeChannelMembers(1, address, memberIndex).call();
    console.log('clicked!!');
  };

  test = () => {
    this.setState(defaultState);
    console.log(this.state);
  };

  render() {
    return (
      <Modal
        open={this.state.showModal}
        trigger={
          <a onClick={this.toggleModal} className="item">
            Edit Members
          </a>
        }
      >
        <Modal.Header>Admin</Modal.Header>
        <Icon name={'close'} onClick={this.toggleModal} />
        <ul>
          {this.state.membersArray.map((member, idx) => {
            return (
              <li key={idx}>
                Member Address: {member}
                <Icon name={'delete'} onClick={() => this.removeMember(member, idx)} />
              </li>
            );
          })}
        </ul>
      </Modal>
    );
  }
}

// fetch all currentApproved
// form
