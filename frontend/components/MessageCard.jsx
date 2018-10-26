import React from 'react';
import Message from './Message';
import { connect } from 'react-redux';

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
                received: (data) => {
                    // dispatch(receiveMessage(message));
                    console.log(data);
                    console.log('hi')
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

    render() { 
        const messages = this.props.messages;
        return ( 
            <div className="message-card">
                <form onSubmit={this.sendMessage}>
                    { messages }
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

export default connect(mapStateToProps)(MessageCard);