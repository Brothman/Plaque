import React from 'react';
import Message from './Message';
import { connect } from 'react-redux';
import { receiveMessage } from '../actions/MessageActions';

class MessageCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            message: "",
         };
        this.sendMessage = this.sendMessage.bind(this);
        this.updateMessage = this.updateMessage.bind(this);
    }

    componentDidMount(){
        // App.cable.subscriptions.subscriptions[1].speak(message);
        App.cable.subscriptions.create(
            { channel: "MessageChannel", room: "Message Room"},
            {
                received: (message) => {
                    // console.log(message);
                    this.props.receiveMessage(message);
                },
                speak: function(data) {
                    return this.perform("speak", data);
                }
            }
        );
    }

    updateMessage(e) {
        this.setState({
            message: e.target.value,
        });
    }

    sendMessage(e){
        e.preventDefault();
        //A hack to get the form element, go into the form's children, 
        //find the input element, and get the input's value
        const messageText = e.currentTarget.elements[0].value;

        const message = { body: messageText, username: this.props.username };
        App.cable.subscriptions.subscriptions[1].speak(message);
        this.setState({ message: "" });
    }

    createMessages(messages){
        return messages.map((message) => {
            return <Message key={message.id} message={message} username={this.props.username} />
        });
    }

    render() { 
        const messages = this.props.messages.messageArray;
        return ( 
            <div className="message-card">
                <div className="message-container">
                    {this.createMessages(messages)}
                </div>
                <form onSubmit={this.sendMessage}>
                    
                    <input  autoFocus={true} type="text"
                            onChange={this.updateMessage} 
                            className="message-input"
                            placeholder="Enter Message" 
                            value={this.state.message} />
                </form>
            </div>
         );
    }
}

const mapStateToProps = ( { messages } )  => {
    return {
        messages,
    };
};

const mapDispatchToProps = ( dispatch ) => {
    return {
        receiveMessage: (message) => dispatch(receiveMessage(message.message)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageCard);