import React from 'react';
import Message from './Message';
import { connect } from 'react-redux';
import { receiveMessage } from '../actions/MessageActions';

import EmojiPicker from 'emoji-picker-react';
import JSEMOJI from 'emoji-js';

class MessageCard extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = { 
            message: "",
            jsemoji: this.setupJSEMOJI(),
         };
        this.sendMessage = this.sendMessage.bind(this);
        this.updateMessage = this.updateMessage.bind(this);
        this.showEmojiPicker = this.showEmojiPicker.bind(this);
        this.addEmoji = this.addEmoji.bind(this);
    }

    setupJSEMOJI() {
        // new instance
        const jsemoji = new JSEMOJI();
        // set the style to emojione (default - apple)
        jsemoji.img_set = 'emojione';
        // set the storage location for all emojis
        jsemoji.img_sets.emojione.path = 'https://cdn.jsdelivr.net/emojione/assets/3.0/png/32/';
    
        // some more settings...
        jsemoji.supports_css = false;
        jsemoji.allow_native = false;
        jsemoji.replace_mode = 'unified';

        return jsemoji;
    }

    componentDidMount(){
        // App.cable.subscriptions.subscriptions[1].speak(message);
        App.cable.subscriptions.create(
            { channel: "MessageChannel", room: "Message Room"},
            {
                received: (message) => {
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

    showEmojiPicker() {
        // this.setState({ emojisVisible: true });
        const myEmojiPicker = document.querySelector(".my-emoji-picker");
        myEmojiPicker.style.visibility = "visible";
    }

    addEmoji(emoji, emojiData) {
        const oldMessage = this.state.message;

        const parsedEmoji = this.state.jsemoji.replace_colons(`:${emojiData.name}:`);
        console.log(parsedEmoji);
        // console.log(emoji)
        // console.log(emojiData);
        const message = oldMessage + parsedEmoji;
        this.setState({ message });
        const myEmojiPicker = document.querySelector(".my-emoji-picker");
        myEmojiPicker.style.visibility = "hidden";
    }

    render() { 
        const messages = this.props.messages.messageArray;

        return ( 
            <div className="message-card">
                <div className="message-container">
                    {this.createMessages(messages)}
                </div>
                <form onSubmit={this.sendMessage}>

                    <div className="my-emoji-picker" style={{ visibility: "hidden" }}>
                        <EmojiPicker className="hello" onEmojiClick={this.addEmoji} />
                    </div>

                    <i onClick={this.showEmojiPicker} className="smile-icon far fa-smile"></i>
           
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