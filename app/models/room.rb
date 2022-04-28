class Room < ApplicationRecord
    has_many :channels, dependent: :destroy
    has_many :room_members, dependent: :destroy
    has_many :users, through: :room_members

    validates :name, presence: true
end
