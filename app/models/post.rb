class Post < ApplicationRecord
    belongs_to :room_member
    belongs_to :channel
    has_many :replies

    validates :room_member_id, presence: true
    validates :channel_id, presence: true
end
