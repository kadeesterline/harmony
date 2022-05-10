class ChannelSerializer < ActiveModel::Serializer
    attributes :id, :name, :room_id

    belongs_to :room
    has_many :posts
    has_many :replies, through: :posts
end