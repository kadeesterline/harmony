class Reply < ApplicationRecord
    belongs_to :post
    belongs_to :room_member

    validates :post_id, presence: true
    validates :room_member_id, presence: true
end
