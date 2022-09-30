class PostsController < ApplicationController


    def index
        posts = Post.all
        render json: posts
    end

    def new_post 
        token = request.headers['token']
        user_id = decode(token)

        post = Post.create!(
            user_id: user_id,
            post_image: params[:post_image],
            description: params[:description]
        )
        render json: post
    end

    def user_posts
        user = User.find_by!(id: params[:id])
        render json: user.posts
    end
end
