class CreateRoomMembers < ActiveRecord::Migration[6.1]
  def change
    create_table :room_members do |t|
      t.integer :user_id
      t.integer :room_id
      t.boolean :is_admin

      t.timestamps
    end
  end
end
