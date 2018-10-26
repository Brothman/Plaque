class CreateMessages < ActiveRecord::Migration[5.1]
  def change
    create_table :messages do |t|
      t.string :body, null: false
      t.string :username, null: false

      t.timestamps
    end
  end
end
