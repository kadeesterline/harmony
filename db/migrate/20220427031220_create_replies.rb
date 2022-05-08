class CreateReplies < ActiveRecord::Migration[6.1]
  def change
    create_table :replies do |t|
      t.integer :post_id
      t.integer :room_member_id
      t.string :content

      t.timestamps
    end
  end
end
