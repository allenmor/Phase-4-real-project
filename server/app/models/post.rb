class Post < ApplicationRecord
    belongs_to :user
    has_many :comments
    has_many :likes
    has_many :users, through: :likes


    def number_of_comments
        comments.length
    end

    def number_of_likes
        likes.length
    end

 

end
