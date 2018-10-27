require 'rails_helper'

RSpec.describe Message, type: :model do

    it { is_expected.to validate_presence_of(:username) }
    it { is_expected.to validate_presence_of(:body) }

    #identical to above, but useful for me as a programmer
    #As I often forget whether ruby considers the empty string valid. 
    it { should_not allow_value('').for(:username) }
    it { should_not allow_value('').for(:body) }

end
