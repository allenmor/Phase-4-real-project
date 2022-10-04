class AddFollowersFollowingToUserSerializer < ActiveModel::Serializer
  attributes :id, :name, :profile_image, :bio, :amount_followers, :amount_following


  def amount_followers
    object.followers.length
  end
  def amount_following
    object.followings.length
  end
end
