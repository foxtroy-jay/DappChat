import React from 'react';
// import ChannelMessage from './ChannelMessage';
// import { toast, Flip } from 'react-toastify';
import {
  // Button,
  // Form,
  // Message,
  // Accordion,
  // AccordionContent,
  // AccordionTitle,
  // Icon,
  Loader,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const msgLength = 50;

export default class ChannelsInHome extends React.Component {
  constructor(props) {
    super();

    this.state = {
      channel: '',
      numOfMessagesInChannel: '',
      lastMessageInChannel: '',
      activeIndex: false,

      loading: false,
      errorMessage: '',
      displayReply: false,
      loadingData: true,
    };
  }
  async componentDidMount() {
    const channelData = await this.props.drizzle.contracts.DappChat.methods
      .getChannelData(this.props.channelIndex)
      .call();

    this.props.drizzle.contracts.DappChat.methods.getChannelData.cacheCall(
      this.props.channelIndex
    );

    const lastMessage = await this.props.drizzle.contracts.DappChat.methods
                        .getMessage(this.props.channelIndex, (channelData[3] -1))
                        .call();
    this.setState({channel: channelData[1], numOfMessagesInChannel: channelData[3], lastMessageInChannel: lastMessage});
    
  }


  render() {

    const { channelIndex } = this.props;
    const {lastMessageInChannel} = this.state;

    return (
      <div className = "singleChannel">

        {/* <div>
          Channel Owner:{' '}
          {this.state[0] ? this.state[0] : <Loader size="mini" active inline />}
        </div> */}
        <div className = "profilePhoto">
        HI
        </div>

        <div className = "channelNameAndMessage">
          <Link to={{ pathname: '/channel', state: { channelIndex } }}>
            {/* Channel Name:{' '} */}
            {this.state.channel ? (
              this.state.channel
            ) : (
              <Loader size="mini" active inline />
            )}
          </Link>

         
            {lastMessageInChannel.length > msgLength ? lastMessageInChannel.slice(0,msgLength) + "..." : lastMessageInChannel}
          </div>
        
        {/* <div>
          Channel Category:{' '}
          {this.state[2] ? this.state[2] : <Loader size="mini" active inline />}
        </div> */}

        {/* <div>
          Channel Category:{' '}
          {this.state[2] ? this.state[2] : <Loader size="mini" active inline />}
        </div> */}

        {/* <div>Restricted: {this.state[4] ? 'True' : 'False'}</div> */}
      </div>
    );
  }
}
