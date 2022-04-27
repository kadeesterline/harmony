class Channel < ApplicationRecord
    belongs_to :room
    has_many :posts
    has_many :replies, through: :posts

    validates :name, presence: true
    validates :room_id, presence: true
end
