# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

u1 = User.create(username: 'test user 1', password: '123', password_confirmation: '123', email: 'test1@test.com')
u2 = User.create(username: 'test user 2', email: 'test2@test.com', password: '123', password_confirmation: '123')


r1 = Room.create(name: 'Room 1')
r2 = Room.create(name: 'Room 2')
r3 = Room.create(name: 'Room 3')
r4 = Room.create(name: 'Room 4')


rm1 = RoomMember.create(user_id: 1, room_id: 1, is_admin: true)
rm2 = RoomMember.create(user_id: 2, room_id: 1, is_admin: false)
rm3 = RoomMember.create(user_id: 2, room_id: 2, is_admin: true)
rm4 = RoomMember.create(user_id: 1, room_id: 2, is_admin: false)
rm5 = RoomMember.create(user_id: 1, room_id: 3, is_admin: true)
rm6 = RoomMember.create(user_id: 2, room_id: 4, is_admin: true)

c1 = Channel.create(name: 'channel 1', room_id: 1)
c2 = Channel.create(name: 'channel 2', room_id: 1)
c3 = Channel.create(name: 'channel 3', room_id: 2)
c4 = Channel.create(name: 'channel 4', room_id: 2)
c5 = Channel.create(name: 'channel 5', room_id: 3)
c6 = Channel.create(name: 'channel 6', room_id: 4)

# p1 = Post.create(room_member_id: rm1, channel_id: c1, content:'test post 1')
# p2 = Post.create(room_member_id: rm2, channel_id: c2, content:'test post 2')
# p3 = Post.create(room_member_id: rm3, channel_id: c3, content:'test post 3')
# p4 = Post.create(room_member_id: rm4, channel_id: c4, content:'test post 4')
# p5 = Post.create(room_member_id: rm5, channel_id: c5, content:'test post 5')
# p6 
# p7
# p8

# re1
# re2
# re3
# re4
# re5
# re6

