class UsersController < ApplicationController


# GET ALL USERS 

    def index
        users = User.all
        render json: users
    end
    # SIGN UP NEW USER
    def newuser
        user = User.create(
            name: params[:name],
            password: params[:password],
            profile_image: 'https://www.pngitem.com/pimgs/m/110-1108526_blank-face-png-high-quality-image-circle-transparent.png',
            posts: 0,
            bio: ''
        )
        if user.valid?
            render json: user, status: :ok
        else
            render json: {error: "Name Taken"}
        end
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
        if user_id
            user = User.find(user_id)
            render json: user, status: :ok
        else
            render json: {error: 'blah'}

        end
    end
end