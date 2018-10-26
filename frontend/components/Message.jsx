const Message = ( { message } ) => {
    return ( 
        <div>
            <p> {message.username} </p>
            <p> {message.body} </p>
        </div>
     );
}
 
export default Message;