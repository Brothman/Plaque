# == Schema Information
#
# Table name: messages
#
#  id         :bigint(8)        not null, primary key
#  body       :string           not null
#  username   :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Message < ApplicationRecord
    validates :body, :username, presence: true
end
