class LikesController < ApplicationController



    def new_like
        # grab token
        token = request.headers['token']
        user_id = decode(token)
        # decode token
        # include user_id from token 
        a = Like.create!(user_id: user_id, post_id: params[:post_id])
        render json: a
    end


end
