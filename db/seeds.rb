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



rm1 = RoomMember.create(user_id: 1, room_id: 1, is_admin: true)
rm2 = RoomMember.create(user_id: 2, room_id: 1, is_admin: false)


c1 = Channel.create(name: 'channel 1', room_id: 1)
c2 = Channel.create(name: 'channel 2', room_id: 1)


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

p3 = Post.create(room_member_id: 2, channel_id: 3, content: '<p>test post 3</p>')

p3.image.attach(
    io: File.open('./public/images/download (2).jpeg'),
    filename: 'download (3).jpeg',
    content_type: 'application/jpeg'
)

p4 = Post.create(room_member_id: 1, channel_id: 1, content: '<p><strong>Bold text</strong></p>')
p5 = Post.create(room_member_id: 1, channel_id: 1, content: '<p><em>Italic text</em></p>')
p6 = Post.create(room_member_id: 1, channel_id: 1, content: '<p><s>You can strike-through</s>and<u>underline<u/> too!</p>')
p7 = Post.create(room_member_id: 1, channel_id: 1, content: '<p>Here is a <code>code snippet</code></p>')
p8 = Post.create(room_member_id: 1, channel_id: 1, content: '<p>Here is a code block</p>')



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


