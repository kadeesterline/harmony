class RoomSerializer < ActiveModel::Serializer
    attributes :id, :name
    has_many :room_members
    has_many :channels

    

end