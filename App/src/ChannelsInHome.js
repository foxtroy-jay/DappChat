import React from 'react';
import ChannelMessage from './ChannelMessage';
import { toast, Flip } from 'react-toastify';
import { Button, Form, Message, Accordion, AccordionContent, AccordionTitle, Icon, Loader } from 'semantic-ui-react';
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

    this.props.drizzle.contracts.DappChat.methods.getChannelData.cacheCall(this.props.channelIndex);

    this.setState(channelData);
  }

//   getData = async (address, index) => {
//     const result = await this.props.drizzle.contracts.DappChat.methods.getChannelData(1).call();
//     return result;
//   };

//   handleInputChange = (event) => {
//     this.setState({
//       [event.target.name]: event.target.value,
//     });
//   };

//   handleSubmit = async (event) => {
//     event.preventDefault();
//     this.setState({ loading: true });

//     toast.info('Processing message...', {
//       position: 'top-right',
//       autoClose: 10000,
//       transition: Flip,
//     });

//     try {
//       await this.props.drizzle.contracts.DappChat.methods
//         .addMessage(this.props.channelIndex, this.state.message)
//         .send({ from: this.props.address });
//     } catch (error) {
//       toast.dismiss();
//       this.setState({ errorMessage: error.message });
//     }
//     this.setState({ loading: false, message: '', errorMessage: '' });
//   };

//   handleClick = (e, titleProps) => {
//     const { index } = titleProps;
//     const { activeIndex } = this.state;
//     const newIndex = activeIndex === index ? -1 : index;

//     this.setState({ activeIndex: newIndex });
//   };

  render() {
    const { drizzleState } = this.props;
    let length = 0;
    let identifier;

    // //Gets list of all single tweet keys
    const keys = Object.keys(drizzleState.contracts.DappChat.getChannelData);

    // //Searches through the getNumReply arguments, matches the index, and saves indentifier
    if (keys.length) {
      for (let i = 0; i < keys.length; i++) {
        if (drizzleState.contracts.DappChat.getChannelData[keys[i]].args[0] === this.props.channelIndex) {
          identifier = keys[i];
          break;
        }
      }

      //   //Finds the newly updated num replies
      if (identifier) {
        length = drizzleState.contracts.DappChat.getChannelData[identifier].value[3];
      }
    }
    const { channelIndex } = this.props;
    return (
      <div>
//         <div>Channel Owner: {this.state[0] ? this.state[0] : <Loader size="mini" active inline />}</div>
//         <div
//           onClick={() => {
//             this.props.clickChannel(channelIndex);
//           }}
//           className="channelLink"
//         >
//           Channel Name: {this.state[1] ? this.state[1] : <Loader size="mini" active inline />}
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
        <div>Channel Category: {this.state[2] ? this.state[2] : <Loader size="mini" active inline />}</div>
        <div>Restricted: {this.state[4] ? 'True' : 'False'}</div>
      </div>
    );
  }
}
