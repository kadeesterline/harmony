class ChannelSerializer < ActiveModel::Serializer
    attributes :id, :name, :room_id

    # belongs_to :room
    has_many :posts
    has_many :replies, through: :posts

    

    # def posts
    #     object.posts.map { |p| p}
    # end

end