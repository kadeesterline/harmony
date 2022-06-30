class CreatePosts < ActiveRecord::Migration[6.1]
  def change
    create_table :posts do |t|
      t.integer :room_member_id
      t.integer :channel_id
      t.string :content
      

      t.timestamps
    end
  end
end
