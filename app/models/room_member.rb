class RoomMember < ApplicationRecord
    belongs_to :user
    belongs_to :room
    has_many :posts
    has_many :replies

    validates :user_id, presence: true
    validates :room_id, presence: true
end
