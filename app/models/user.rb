class User < ApplicationRecord
    has_secure_password
    has_many :room_members
    has_many :rooms, through: :room_members
    has_many :replies, through: :room_members
    has_many :posts, through: :room_members

    validates  :username, presence: true, uniqueness: true
    validates :email, presence: true, uniqueness: true 
end
