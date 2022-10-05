# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

Post.destroy_all
Comment.destroy_all

200.times do |t|
    Post.create(
        user_id: User.all.sample.id,
        post_image: Faker::LoremFlickr.image,
        description: Faker::Lorem.sentence
    )
end

400.times do |t|
    Comment.create(
        user_id: User.all.sample.id,
        post_id: Post.all.sample.id,
        description: Faker::Lorem.sentence
    )
end
