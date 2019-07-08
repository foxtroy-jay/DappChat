import React from 'react';
import {Button} from 'semantic-ui-react';

export default class FollowButton extends React.Component {
    constructor(){
        super();
        this.state = {
            followedStatus: false,
            loading: false
        }
    }

    async componentDidMount() {
        const {drizzle, drizzleState} = this.props;
        const followedChannels = await drizzle.contracts.DappChat.methods.getFollowedChannels().call();

        drizzle.contracts.DappChat.methods.getFollowedChannels.cacheCall();


        const followedStatus = followedChannels.includes(this.props.channelIndex.toString());
        
        this.setState({followedStatus:followedStatus});
    }

    follow = async () => {
        const {drizzle, drizzleState, channelIndex} = this.props;
       try {
        this.setState({loading: true});

        if(!this.state.followedStatus){
            await drizzle.contracts.DappChat.methods.followChannel(channelIndex).send({from: drizzleState.accounts[0]});
            this.setState({followedStatus:true})
        } else {
            await drizzle.contracts.DappChat.methods.unfollowChannel(channelIndex).send({from: drizzleState.accounts[0]});
                this.setState({followedStatus:false})
        }
       } catch (error) {
            
       } 
       this.setState({loading: false});
    }

    render(){

        console.log("STATE ", this.state)
        return (this.state.followedStatus) ? (
            <Button loading = {this.state.loading} disabled = {this.state.loading} onClick = {this.follow}> Unfollow </Button>
        ) : (
            <Button primary loading = {this.state.loading} disabled = {this.state.loading} onClick = {this.follow}> Follow </Button>
        )
    }
}