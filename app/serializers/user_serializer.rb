class UserSerializer < ActiveModel::Serializer
    attributes :id, :username, :rooms
    has_many :room_members
    has_many :rooms, through: :room_members
    has_many :replies, through: :room_members
    has_many :posts, through: :room_members

    def rooms
      object.room_members.map { |m| m.room}
    end
  end