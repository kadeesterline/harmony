class Room < ApplicationRecord
    has_many :channels
    has_many :room_members
    has_many :users, through: :room_members

    validates :name, presence: true
end
