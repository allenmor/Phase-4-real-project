class CommentsController < ApplicationController


    def index
        comments = Comment.all
        render json: comments
    end
    
    def post_comments
        post = Post.find(params[:id])
        comments = post.comments
        render json: comments
    end

    def new_comment
        token = request.headers['token']
        user_id = decode(token)
        comment = Comment.create(
            post_id: params[:post_id],
            user_id: user_id,
            description: params[:description]
        )
        render json: comment
    end

end
