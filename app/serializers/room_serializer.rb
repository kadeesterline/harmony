class RoomSerializer < ActiveModel::Serializer
    attributes :id, :name, :channels, :room_members
    
    
    has_many :room_members
    has_many :channels
    # has_many :posts, through: :channels
    
    def channels
        object.channels.map { |c| c}
    end

    def room_members
        object.room_members.map{ |m| m}
    end
    

end