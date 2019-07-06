import React from 'react';
import ChannelMessage from './ChannelMessage';
import { toast, Flip } from 'react-toastify';
import {
  Button,
  Form,
  Message,
  Accordion,
  AccordionContent,
  AccordionTitle,
  Icon,
  Loader,
} from 'semantic-ui-react';

export default class Channel extends React.Component {
  constructor(props) {
    super();

    this.state = {
      message: '',
      activeIndex: false,
      loading: false,
      errorMessage: '',
      displayReply: false,
      loadingData: true,
    };
  }
  async componentDidMount() {
    const channelData = await this.props.drizzle.contracts.Stealth.methods
      .getChannelData(this.props.channelIndex)
      .call();

    // console.log(
    //   channelData,
    //   'CHANNEL DATA',
    //   this.props.channelIndex,
    //   'channelindex'
    // );
    this.props.drizzle.contracts.Stealth.methods.getChannelData.cacheCall(
      this.props.channelIndex
    );

    this.setState(channelData);
  }

  getData = async (address, index) => {
    console.log(this.props.channelIndex);
    const result = await this.props.drizzle.contracts.Stealth.methods
      .getChannelData(1)
      .call();
    console.log(result);
    return result;
  };

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
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
      await this.props.drizzle.contracts.Stealth.methods
        .addMessage(this.props.channelIndex, this.state.message)
        .send({ from: this.props.address });
    } catch (error) {
      toast.dismiss();
      this.setState({ errorMessage: error.message });
    }
    this.setState({ loading: false, message: '', errorMessage: '' });
  };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  render() {
    const { drizzleState } = this.props;
    let length = 0;
    let identifier;

    // //Gets list of all single tweet keys
    const keys = Object.keys(drizzleState.contracts.Stealth.getChannelData);

    // //Searches through the getNumReply arguments, matches the index, and saves indentifier
    if (keys.length) {
      for (let i = 0; i < keys.length; i++) {
        // console.log(drizzleState.contracts.Stealth.getChannelData);
        if (
          drizzleState.contracts.Stealth.getChannelData[keys[i]].args[0] ===
          this.props.channelIndex
        ) {
          identifier = keys[i];
          break;
        }
      }

      //   //Finds the newly updated num replies
      if (identifier) {
        length =
          drizzleState.contracts.Stealth.getChannelData[identifier].value[3];
      }
    }

    let channelMessageArray = [];
    const { displayReply } = this.state;

    for (let idx = 0; idx < length; idx++) {
      channelMessageArray.push(
        <AccordionContent active={displayReply} key={idx}>
          <ChannelMessage
            userAddress={this.props.address}
            channelIndex={this.props.channelIndex}
            messageIndex={idx}
            drizzle={this.props.drizzle}
          />
        </AccordionContent>
      );
    }
    channelMessageArray.reverse();

    // console.log(identifier, 'IDENTIFIER');
    return (
      <div>
        <div>
          Channel Owner:{' '}
          {this.state[0] ? this.state[0] : <Loader size="mini" active inline />}
        </div>
        <div>
          Channel Name:{' '}
          {this.state[1] ? this.state[1] : <Loader size="mini" active inline />}
        </div>
        <div>
          Channel Category:{' '}
          {this.state[2] ? this.state[2] : <Loader size="mini" active inline />}
        </div>
        <div>Restricted: {this.state[4] ? 'True' : 'False'}</div>
        <p>Messages: {length}</p>

        {/* Should move to new component */}
        <div>
          <Accordion fluid styled>
            <div>
              <Form
                onSubmit={this.handleSubmit}
                error={!!this.state.errorMessage}
              >
                <input
                  key="message"
                  name="message"
                  value={this.state.message}
                  placeholder="Message"
                  onChange={this.handleInputChange}
                />
                <Message
                  error
                  header="Oops!"
                  content={this.state.errorMessage}
                />

                <Button loading={this.state.loading}>Message</Button>
              </Form>
              <div>
                <AccordionTitle
                  active={displayReply}
                  onClick={() => {
                    this.setState({
                      displayReply: !displayReply,
                    });
                  }}
                >
                  <Icon name="dropdown" />
                  Replies
                </AccordionTitle>

                {channelMessageArray}
                <AccordionContent
                  active={displayReply && channelMessageArray.length === 0}
                >
                  <h2>No replies yet</h2>
                </AccordionContent>
              </div>
            </div>
          </Accordion>
        </div>
        {/* Should move to new component */}
      </div>
    );
  }
}
