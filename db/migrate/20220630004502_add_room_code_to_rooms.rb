class AddRoomCodeToRooms < ActiveRecord::Migration[7.0]
  def change
    add_column :rooms, :room_code, :string
  end
end
