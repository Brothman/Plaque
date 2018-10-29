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

        //auto focus on contentEditable Div to send Messsages
        const messageInput = document.querySelector(".message-input");
        messageInput.focus();

        this.listenForEnter(messageInput);
    }

    listenForEnter(messageInput) {

        messageInput.addEventListener('keydown', function (e) {
            //stop a new div being created upon enter click
            if (e.keyCode === 13) {
                e.preventDefault();
            }
        });

        messageInput.addEventListener('keyup', e => {
            if (e.keyCode === 13) {
                this.sendMessage(messageInput.innerHTML);
            }
        });
    }

    updateMessage(e) {
        console.log('hi')
        this.setState({
            message: e.target.value,
        });
    }

    sendMessage(messageText){
        const message = { body: messageText, username: this.props.username };
        App.cable.subscriptions.subscriptions[1].speak(message);
        this.clearMessageInput();
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

    hideEmojiPicker() {
        // this.setState({ emojisVisible: true });
        const myEmojiPicker = document.querySelector(".my-emoji-picker");
        myEmojiPicker.style.visibility = "hidden";


       

        const messageInput = document.querySelector(".message-input");
        if (messageInput.childNodes.length === 0) {
            messageInput.focus();
            return;
        }
        // messageInput.focus();

        // const innerHTML = messageInput.innerHTML;
        // messageInput.innerHTML = "";
        // messageInput.focus();
        // messageInput.innerHTML = innerHTML;


        var range = document.createRange();
        var sel = window.getSelection();
        const length = messageInput.childNodes.length;
        // range.setStart(messageInput.childNodes[0], 1000);
        range.setEnd(messageInput.childNodes[length - 1], 0); 
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);
        messageInput.focus();
    }

    clearMessageInput() {
        const messageInput = document.querySelector(".message-input");
        messageInput.innerHTML = "";
    }

    addEmoji(emoji, emojiData) {
        const parsedEmoji = this.state.jsemoji.replace_colons(`:${emojiData.name}:`);

        const messageInput = document.querySelector(".message-input");
        messageInput.innerHTML += parsedEmoji;

        this.hideEmojiPicker();
    }

    render() { 
        const messages = this.props.messages.messageArray;

        return ( 
            <div className="message-card" >
                <div className="message-container" onClick={this.hideEmojiPicker}>
                    {this.createMessages(messages)}
                </div>

                <div className="my-emoji-picker" style={{ visibility: "hidden" }}>
                    <EmojiPicker className="hello" onEmojiClick={this.addEmoji} />
                </div>

                <i onClick={this.showEmojiPicker} className="smile-icon far fa-smile"></i>

                <div  autoFocus={true} type="text"
                        onChange={this.updateMessage} 
                        className="message-input"
                        placeholder="Enter Message" 
                        value={this.state.message}
                        contentEditable>
                </div>

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
