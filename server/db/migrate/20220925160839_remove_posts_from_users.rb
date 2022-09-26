class RemovePostsFromUsers < ActiveRecord::Migration[7.0]
  def change
    remove_column :users, :posts, :integer
  end
end
