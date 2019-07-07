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
import { Link } from 'react-router-dom';

export default class ChannelsInHome extends React.Component {
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
    const channelData = await this.props.drizzle.contracts.DappChat.methods
      .getChannelData(this.props.channelIndex)
      .call();

    this.props.drizzle.contracts.DappChat.methods.getChannelData.cacheCall(
      this.props.channelIndex
    );

    this.setState(channelData);
  }

  render() {
    const { drizzleState } = this.props;
    let length = 0;
    let identifier;

    // //Gets list of all single tweet keys
    const keys = Object.keys(drizzleState.contracts.DappChat.getChannelData);

    // //Searches through the getNumReply arguments, matches the index, and saves indentifier
    if (keys.length) {
      for (let i = 0; i < keys.length; i++) {
        if (
          drizzleState.contracts.DappChat.getChannelData[keys[i]].args[0] ===
          this.props.channelIndex
        ) {
          identifier = keys[i];
          break;
        }
      }

      //   //Finds the newly updated num replies
      if (identifier) {
        length =
          drizzleState.contracts.DappChat.getChannelData[identifier].value[3];
      }
    }
    const { channelIndex } = this.props;
    return (
      <div>
        <div>
          Channel Owner:{' '}
          {this.state[0] ? this.state[0] : <Loader size="mini" active inline />}
        </div>
        <div>
          <Link to={{ pathname: '/channel', state: { channelIndex } }}>
            Channel Name:{' '}
            {this.state[1] ? (
              this.state[1]
            ) : (
              <Loader size="mini" active inline />
            )}
          </Link>
        </div>
        <div>
          Channel Category:{' '}
          {this.state[2] ? this.state[2] : <Loader size="mini" active inline />}
        </div>
        <div>Restricted: {this.state[4] ? 'True' : 'False'}</div>
      </div>
    );
  }
}
