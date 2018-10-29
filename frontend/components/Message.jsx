import React from 'react';
import ReactDOM from 'react-dom';

class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    //I made it a full React component to tap into lifecycle methods
    componentDidMount() {
        //ensures the message-container always scrolls to the bottom when new messages are sent/received
        const messageContainer = document.querySelector('.message-container');
        messageContainer.scrollTop = messageContainer.scrollHeight;
    }
    render() { 
        const message = this.props.message;
        const reactMessageBody = <div className="message-div" dangerouslySetInnerHTML={{ __html: message.body }}></div>

        if (message.username == this.props.username) {
            return (
                <div className="my-message">
                    <p className="message-username"> {message.username} </p>
                    <div className="message-body"> {reactMessageBody} </div>
                </div>
            );
        }

        else {
            return (
                <div className="others-message">
                    <p className="message-username"> {message.username} </p>
                    <p className="message-body"> {reactMessageBody} </p>
                </div>
            );
        }
    }
}
 
export default Message;