class AddPostsToEachUserSerializer < ActiveModel::Serializer
  attributes :id, :name, :profile_image, :bio, :posts, :amount_followers, :amount_following

  def posts
    object.posts
  end
  def amount_followers
    object.followers.length
  end
  def amount_following
    object.followings.length
  end
end
