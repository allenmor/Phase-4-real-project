class PostSerializer < ActiveModel::Serializer
  attributes :id, :post_image, :description, :number_of_comments
  has_one :user
end
