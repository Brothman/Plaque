require 'rails_helper'
#Code heavily inspired from https://medium.com/@tomekw/unit-testing-actioncable-channels-with-rspec-ca67ca6834af
# This is the minimal ActionCable connection stub to make the test pass
class TestConnection
  attr_reader :identifiers, :logger

  #This appears (initialize method plus @identifies) to be the
  # minimum I need to make this connection stub work
  def initialize(identifiers_hash = {})
    @identifiers = identifiers_hash.keys
  end
end

RSpec.describe MessageChannel, type: :channel do
    let(:connection) { TestConnection.new() }

    subject(:channel) { described_class.new(connection, {}) }


    let(:action_cable) { ActionCable.server }

  #My unique contribution starts here. 
  let(:message) do
    {
      "username" => "test_action",
      "body" => "This is a test message"
    }
  end

  it "broadcasts the newly created message' 1 time"  do
    expect(action_cable).to receive(:broadcast).with("message:message_channel", {message: Message}).exactly(1).times

    channel.speak(message)
  end
end
