class CreatePosts < ActiveRecord::Migration[7.0]
  def change
    create_table :posts do |t|
      t.integer :room_member_id
      t.integer :channel_id
      t.string :content
      t.string :gif_url

      t.timestamps
    end
  end
end
