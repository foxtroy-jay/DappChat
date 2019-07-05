import React from 'react';
import ReplyTweet from './ReplyTweet';
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

export default class SingleTweet extends React.Component {
  constructor(props) {
    super();

    this.state = {
      reply: '',
      activeIndex: false,
      loading: false,
      errorMessage: '',
      displayReply: false,
      loadingData: true,
    };
  }
  async componentDidMount() {
    await this.props.drizzle.contracts.Twittor.methods.getNumReplies.cacheCall(
      this.props.address,
      this.props.index
    );

    const tweetData = await this.getData(this.props.address, this.props.index);
    this.setState(tweetData);
  }

  getData = async (address, index) => {
    const result = await this.props.drizzle.contracts.Twittor.methods
      .getEverythingTweetStruct(address, index)
      .call();
    return result;
  };

  handleInputChange = event => {
    this.setState({
      reply: event.target.value,
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ loading: true });

    toast.info('Processing reply...', {
      position: 'top-right',
      autoClose: 10000,
      transition: Flip,
    });

    try {
      await this.props.drizzle.contracts.Twittor.methods
        .addReply(this.props.address, this.props.index, this.state.reply)
        .send({ from: this.props.address });
    } catch (error) {
      toast.dismiss();
      this.setState({ errorMessage: error.message });
    }
    this.setState({ loading: false, reply: '' });
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

    //Gets list of all single tweet keys
    const keys = Object.keys(drizzleState.contracts.Twittor.getNumReplies);

    //Searches through the getNumReply arguments, matches the index, and saves indentifier
    if (keys.length) {
      for (let i = 0; i < keys.length; i++) {
        if (
          drizzleState.contracts.Twittor.getNumReplies[keys[i]].args[1] ===
          this.props.index
        ) {
          identifier = keys[i];
          break;
        }
      }

      //Finds the newly updated num replies
      if (identifier) {
        length = drizzleState.contracts.Twittor.getNumReplies[identifier].value;
      }
    }
    let mapArray = [];
    if (length) {
      mapArray.length = length;
      mapArray.fill(1);
    }
    const { displayReply } = this.state;

    return (
      <div>
        <div>
          Block Num:{' '}
          {this.state[2] ? this.state[2] : <Loader size="mini" active inline />}
          {/* (this.setState({ loadingData: false }), */}
        </div>
        <div>
          Tweet:{' '}
          {this.state[0] ? this.state[0] : <Loader size="mini" active inline />}
        </div>
        <p>Replies: {length}</p>

        {/* Should move to new component */}
        <div>
          <Accordion fluid styled>
            <div>
              <Form
                onSubmit={this.handleSubmit}
                error={!!this.state.errorMessage}
              >
                <input
                  key="reply"
                  name="reply"
                  value={this.state.reply}
                  placeholder="reply"
                  onChange={this.handleInputChange}
                />
                <Message
                  error
                  header="Oops!"
                  content={this.state.errorMessage}
                />

                <Button loading={this.state.loading}>Reply</Button>
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

                {mapArray
                  .map((tweet, idx) => {
                    return (
                      <AccordionContent active={displayReply} key={idx}>
                        <ReplyTweet
                          address={this.props.address}
                          index={this.props.index}
                          replyIndex={idx}
                          drizzle={this.props.drizzle}
                        />
                      </AccordionContent>
                    );
                  })
                  .reverse()}
                <AccordionContent
                  active={displayReply && mapArray.length === 0}
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
