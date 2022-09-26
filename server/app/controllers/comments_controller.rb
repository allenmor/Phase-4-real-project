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
end
