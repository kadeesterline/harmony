class RoomSerializer < ActiveModel::Serializer
    attributes :id, :name, :channels
    
    
    has_many :room_members
    has_many :channels
    has_many :posts, through: :channels
    
    def channels
        object.channels.map { |c| c}
    end
    

end