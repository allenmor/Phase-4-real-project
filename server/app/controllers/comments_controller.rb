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
        comment = Comment.create(comment_params)
        render json: comment
    end

    private
    def comment_params
        params.permit(:post_id, :user_id, :description)
    end
end
