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
import makeBlockie from 'ethereum-blockies-base64';


const msgLength = 45;

export default class ChannelsInHome extends React.Component {
  constructor(props) {
    super();

    this.state = {
      channel: '',
      numOfMessagesInChannel: '',
      lastMessageInChannel: '',
      lastMessageSender: '',
      lastMessageTime: '',
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
                        .getReplyData(this.props.channelIndex, (channelData[3] -1))
                        .call();
    console.log("last message", lastMessage[3])
    let time = "";
    if(lastMessage[3] != 0) {
      const date = new Date(lastMessage[3] * 1000);
      // time = `${date.getFullYear()} ${date.getMonth()} ${date.getDay()} ${date.getHours()}:${date.getMinutes()}`;

      time = `${date.getHours()}:${date.getMinutes()}`;
      console.log("time", time)

    }


    this.setState({channel: channelData[1], 
                numOfMessagesInChannel: channelData[3], 
                lastMessageInChannel: lastMessage[0], 
                lastMessageSender: lastMessage[1], 
                lastMessageTime: time
    });
    
  }


  render() {

    const { channelIndex } = this.props;
    const {lastMessageInChannel} = this.state;

    return (
      <div className = "singleChannel">

        <div className = "profilePhoto">
          {this.state.lastMessageSender ? <img className="blockies" src={makeBlockie(this.state.lastMessageSender)} /> : ''}
        </div> 

        <div className = "channelNameAndMessage">

        <div className = "channelNameAndTime">

          <Link to={{ pathname: '/channel', state: { channelIndex } }}>
            {/* Channel Name:{' '} */}
            {/* {this.state.channel ? ( */}

              <div>
                {this.state.channel}
              </div>

            {/* // ) : (
            //   <Loader size="mini" active inline />
            // )} */}
          </Link>

          <div>
                    {this.state.lastMessageTime}
                  </div>
          </div>

   
            {lastMessageInChannel.length > msgLength ? lastMessageInChannel.slice(0,msgLength) + "..." : lastMessageInChannel
              
            }
          </div>
  
      </div>
    );
  }
}
