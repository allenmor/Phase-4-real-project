class PostSerializer < ActiveModel::Serializer
  attributes :id, :post_image, :description, :number_of_comments, :number_of_likes, :first_liked
  belongs_to :user

  def first_liked
    if object.likes.first
      object.likes.first.user
    else
      'Not Liked Yet'
      
    end
  end
end
