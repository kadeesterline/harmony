class RoomSerializer < ActiveModel::Serializer
    attributes :id, :name, :room_code, :channels, :room_members
    
    has_many :room_members
    has_many :channels
    
    def channels
        object.channels.map { |c| c}
    end

    def room_members
        object.room_members.map{ |m| m}
    end
    

end