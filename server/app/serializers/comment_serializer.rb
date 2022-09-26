class CommentSerializer < ActiveModel::Serializer
  attributes :description
  belongs_to :user
end
