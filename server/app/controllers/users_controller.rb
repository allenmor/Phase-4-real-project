class UsersController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

# GET ALL USERS 

    def index
        users = User.all
        render json: users
    end
    # SIGN UP NEW USER
    def newuser
        user = User.create!(
            name: params[:name],
            password: params[:password],
            profile_image: 'https://www.pngitem.com/pimgs/m/110-1108526_blank-face-png-high-quality-image-circle-transparent.png',
            bio: ''
        )
        token = encode(user.id)
        render json: {user: user, token: token}
    end

    def login
        user = User.find_by(name: params[:name]).try(:authenticate, params[:password])

        if user 
            token = encode(user.id)
            render json: {user: user, token: token}, status: :ok
        else
            render json: {error: 'User doesnt exist'}, status: :unprocessable_entity
        end
    end

    def me
        token = request.headers['token']
        user_id = decode(token)
        user = User.find_by!(id: user_id)
        render json: user
    end

    private
    def render_unprocessable_entity_response(invalid)
        render json: {error: invalid.record.errors.full_messages}, status: :unprocessable_entity
      end
end