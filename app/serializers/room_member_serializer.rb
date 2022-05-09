class RoomMemberSerializer < ActiveModel::Serializer
    attributes :id, :user_id, :room_id, :is_admin, :is_mod, :user
    
    belongs_to :user
    belongs_to :room
    has_many :replies
    has_many :posts
    
end