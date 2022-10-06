class AddFollowersFollowingToUserSerializer < ActiveModel::Serializer
  attributes :id, :name, :profile_image, :bio,:amount_followers, :amount_following
end
