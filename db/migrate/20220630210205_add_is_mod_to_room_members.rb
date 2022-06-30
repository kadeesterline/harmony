class AddIsModToRoomMembers < ActiveRecord::Migration[7.0]
  def change
    add_column :room_members, :is_mod, :boolean
  end
end
