class RoomMemberSerializer < ActiveModel::Serializer
    attributes :id, :user_id, :room_id, :is_admin, :user
    has_many :Rooms
    has_many :replies
    has_many :posts
    has_one :user
end