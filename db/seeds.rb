# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

u1 = User.create(username: 'test user 1', password: '123', password_confirmation: '123', email: 'test1@test.com')
u2 = User.create(username: 'test user 2', email: 'test2@test.com', password: '123', password_confirmation: '123')


r1 = Room.create(name: 'Room 1', room_code: (0..8).map { ('a'..'z').to_a[rand(26)] }.join)
r2 = Room.create(name: 'Room 2', room_code: (0..8).map { ('a'..'z').to_a[rand(26)] }.join)
r3 = Room.create(name: 'Room 3', room_code: (0..8).map { ('a'..'z').to_a[rand(26)] }.join)
r4 = Room.create(name: 'Room 4', room_code: (0..8).map { ('a'..'z').to_a[rand(26)] }.join)


rm1 = RoomMember.create(user_id: 1, room_id: 1, is_admin: true)
rm2 = RoomMember.create(user_id: 2, room_id: 1, is_admin: false)
rm3 = RoomMember.create(user_id: 2, room_id: 2, is_admin: true)
rm4 = RoomMember.create(user_id: 1, room_id: 2, is_admin: false)
rm5 = RoomMember.create(user_id: 1, room_id: 3, is_admin: true)
rm6 = RoomMember.create(user_id: 1, room_id: 4, is_admin: true)

c1 = Channel.create(name: 'channel 1', room_id: 1)
c2 = Channel.create(name: 'channel 2', room_id: 1)
c3 = Channel.create(name: 'channel 3', room_id: 2)
c4 = Channel.create(name: 'channel 4', room_id: 2)
c5 = Channel.create(name: 'channel 5', room_id: 3)
c6 = Channel.create(name: 'channel 6', room_id: 4)

p1 = Post.create(room_member_id: 1, channel_id: 1, content: '<p>test post 1</p>')

p1.image.attach(
    io: File.open('./public/images/download.jpeg'),
    filename: 'download.jpeg',
    content_type: 'application/jpeg'
)

p2 = Post.create(room_member_id: 2, channel_id: 1, content: '<p>test post 2</p>')

p2.image.attach(
    io: File.open('./public/images/download (1).jpeg'),
    filename: 'download (1).jpeg',
    content_type: 'application/jpeg'
)

p3 = Post.create(room_member_id: 3, channel_id: 3, content: '<p>test post 3</p>')

p3.image.attach(
    io: File.open('./public/images/download (2).jpeg'),
    filename: 'download (3).jpeg',
    content_type: 'application/jpeg'
)

p4 = Post.create(room_member_id: 4, channel_id: 4, content: '<p>test post 4</p>')
p5 = Post.create(room_member_id: 1, channel_id: 1, content: '<p>test post 5</p>')
p6 = Post.create(room_member_id: 2, channel_id: 1, content: '<p>test post 6</p>')
p7 = Post.create(room_member_id: 3, channel_id: 3, content: '<p>test post 7</p>')
p8 = Post.create(room_member_id: 4, channel_id: 4, content: '<p>test post 8</p>')
p9 = Post.create(room_member_id: 1, channel_id: 1, content: '<p>test post 9</p>')
p10 = Post.create(room_member_id: 1, channel_id: 1, content: '<p>test post 10</p>')
p11 = Post.create(room_member_id: 1, channel_id: 1, content: '<p>test post 11</p>')
p12 = Post.create(room_member_id: 1, channel_id: 1, content: '<p>test post 12</p>')
p13 = Post.create(room_member_id: 1, channel_id: 1, content: '<p>test post 13</p>')
p14 = Post.create(room_member_id: 1, channel_id: 1, content: '<p>test post 14</p>')
p15 = Post.create(room_member_id: 1, channel_id: 1, content: '<p>test post 15</p>')
p16 = Post.create(room_member_id: 1, channel_id: 1, content: '<p>test post 16</p>')


re1 = Reply.create(post_id: 1, room_member_id: 1, content: 'test reply 1')

re1.image.attach(
    io: File.open('./public/images/download (2).jpeg'),
    filename: 'download (3).jpeg',
    content_type: 'application/jpeg'
)

re2 = Reply.create(post_id: 1, room_member_id: 1, content: 'test reply 2')

re2.image.attach(
    io: File.open('./public/images/download (1).jpeg'),
    filename: 'download (1).jpeg',
    content_type: 'application/jpeg'
)

re3 = Reply.create(post_id: 1, room_member_id: 1, content: 'test reply 3')
re4 = Reply.create(post_id: 2, room_member_id: 2, content: 'test reply 4')
re5 = Reply.create(post_id: 2, room_member_id: 2, content: 'test reply 5')
re6 = Reply.create(post_id: 2, room_member_id: 2, content: 'test reply 6')
re7 = Reply.create(post_id: 3, room_member_id: 3, content: 'test reply 7')
re8 = Reply.create(post_id: 3, room_member_id: 3, content: 'test reply 8')
re9 = Reply.create(post_id: 3, room_member_id: 3, content: 'test reply 9')
re10 = Reply.create(post_id: 4, room_member_id: 4, content: 'test reply 10')
re11 = Reply.create(post_id: 4, room_member_id: 4, content: 'test reply 11')
re12 = Reply.create(post_id: 4, room_member_id: 4, content: 'test reply 12')
re13 = Reply.create(post_id: 5, room_member_id: 1, content: 'test reply 13')
re14 = Reply.create(post_id: 5, room_member_id: 1, content: 'test reply 14')
re15 = Reply.create(post_id: 5, room_member_id: 1, content: 'test reply 15')
re16 = Reply.create(post_id: 6, room_member_id: 2, content: 'test reply 16')
re17 = Reply.create(post_id: 6, room_member_id: 2, content: 'test reply 17')

