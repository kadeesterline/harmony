class PostSerializer < ActiveModel::Serializer
        attributes :id, :channel_id, :room_member_id, :content, :replies, :gif_url

    belongs_to :channel
    belongs_to :room_member
    has_many :replies
    
end