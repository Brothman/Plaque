FactoryBot.define do
  factory :message do
    username { Faker::Name.first_name}
    body { Faker::Lorem.paragraph }
  end
end
