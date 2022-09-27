class User < ApplicationRecord
    has_secure_password
    has_many :posts
    has_many :comments
    has_many :posts, through: :likes

    validates :name, presence: true, uniqueness: true
end
