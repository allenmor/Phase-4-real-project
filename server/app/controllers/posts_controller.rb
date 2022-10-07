class PostsController < ApplicationController


    def index
        token = request.headers['token']
        user_id = decode(token)
        user = User.find(user_id)
        posts = Post.where(user_id: user.followings.pluck('id'))
        render json: posts|user.posts
    end

    def explore 
        render json: Post.all
    end

    def user_post_delete
        a = Post.find_by!(id: params[:id])
        a.destroy
        render json: {status: 'OK'}
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
