class User < ApplicationRecord
    has_secure_password
    has_many :likes
    has_many :comments
    has_many :posts

    validates :name, presence: true, uniqueness: true
end
