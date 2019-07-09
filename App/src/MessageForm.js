import React, { Component } from 'react';
import { toast, Flip } from 'react-toastify';
import { Button, Form, Message, Input, Icon, Popup } from 'semantic-ui-react';
import EmojiPicker from 'emoji-picker-react';

export default class MessageForm extends Component {
  constructor(props) {
    super();

    this.state = {
      currentAddress: '',
      message: '',
      errorMessage: '',
      loading: false, // disables button upon submission
      emojiWindow: true,
    };
  }

  async componentDidMount() {
    const { drizzle } = this.props;
    const currentAddress = await drizzle.web3.eth.getAccounts();
    this.setState({
      currentAddress: currentAddress[0],
    });
  }

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    console.log(this.state);
  };

  handleSubmit = async event => {
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
          <Input
            key="message"
            name="message"
            value={this.state.message}
            placeholder="Message"
            onChange={this.handleInputChange}
            icon={
              <Popup
                trigger={
                  <Icon
                    name="smile outline"
                    link
                    onClick={() =>
                      this.setState({
                        emojiWindow: !this.state.emojiWindow,
                      })
                    }
                  />
                }
                on="click"
              >
                <EmojiPicker
                  onEmojiClick={code => {
                    let emoji = String.fromCodePoint(`0x${code}`);
                    this.setState({
                      message: `${this.state.message}${emoji}`,
                    });
                  }}
                />
              </Popup>
            }
            content="is this working?"
            position="bottom center"
          />

          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button loading={this.state.loading} disabled={this.state.loading}>
            Message
          </Button>
        </Form>
      </div>
    );
  }
}
