class MessageChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_for 'message_channel'
  end

  def speak(message)
    @message = message['message']
    @new_message = Message.create( body: message['body'], username: message['username'] );

    @socket_message = {
      message: @new_message
    }

    MessageChannel.broadcast_to('message_channel', @socket_message)
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

end
