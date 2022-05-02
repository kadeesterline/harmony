class Reply < ApplicationRecord
    belongs_to :post
    belongs_to :room_member
    has_one_attached :image

    validates :post_id, presence: true
    validates :room_member_id, presence: true
end
