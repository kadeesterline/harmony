class ReplySerializer < ActiveModel::Serializer
    attributes :id, :post_id, :room_member_id, :content

    belongs_to :post
    belongs_to :room_member
end