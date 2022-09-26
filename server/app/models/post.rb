class Post < ApplicationRecord
    belongs_to :user
    has_many :comments

    def number_of_comments
        comments.length
    end
end
