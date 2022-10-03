class FollowsController < ApplicationController

    def create
        token = request.headers['token']
        user_id = decode(token)
        follow = Follow.create(follower_id: user_id, followed_user_id: params[:followed_user_id])
        render json: follow
    end

end
