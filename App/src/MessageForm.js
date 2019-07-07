import React, { Component } from 'react';
import { toast, Flip } from 'react-toastify';
import { Button, Form, Message, Accordion, AccordionContent, AccordionTitle, Icon, Loader } from 'semantic-ui-react';

export default class MessageForm extends Component {
  constructor(props) {
    super();

    this.state = {
      currentAddress: '',
      message: '',
      errorMessage: '',
      loading: false, // disables button upon submission
    };
  }

  async componentDidMount() {
    const { drizzle } = this.props;
    const currentAddress = await drizzle.web3.eth.getAccounts();
    this.setState({
      currentAddress: currentAddress[0],
    });
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ loading: true });

    toast.info('Processing message...', {
      position: 'top-right',
      autoClose: 10000,
      transition: Flip,
    });
    try {
      // sends message to K
      await this.props.drizzle.contracts.DappChat.methods
        .addMessage(this.props.channelIndex, this.state.message)
        .send({ from: this.state.currentAddress });
    } catch (error) {
      toast.dismiss();
      this.setState({ errorMessage: error.message });
    }
    this.setState({ loading: false, message: '', errorMessage: '' });
  };

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit} error={!!this.state.errorMessage}>
          <input
            key="message"
            name="message"
            value={this.state.message}
            placeholder="Message"
            onChange={this.handleInputChange}
          />
          <Message error header="Oops!" content={this.state.errorMessage} />

          <Button loading={this.state.loading}>Message</Button>
        </Form>
      </div>
    );
  }
}
