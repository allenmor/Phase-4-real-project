class UsersController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

# GET ALL USERS 

    def index
        users = User.all
        render json: users
    end

    def user_post_delete
        post.find_by!(id: params[:id])
        post.destroy
        head :no_content
    end

    def show
        user = User.find_by!(id: params[:id])
        render json: user, serializer: AddPostsToEachUserSerializer
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
            serialzied_user = user.as_json(only: [:id, :name, :profile_image, :bio],methods: [:amount_followers, :amount_following])
            render json: {user: serialzied_user, token: token}, status: :ok
        else
            render json: {error: 'User doesnt exist'}, status: :unprocessable_entity
        end
    end

    def me
        token = request.headers['token']
        user_id = decode(token)
        user = User.find_by!(id: user_id)
        render json: user, serializer: AddFollowersFollowingToUserSerializer
    end

    def update_name
        token = request.headers['token']
        user_id = decode(token)
        user = User.find_by!(id: user_id)
        user.update(name: params[:name])
        render json: user
    end
    def update_image
        token = request.headers['token']
        user_id = decode(token)
        user = User.find_by!(id: user_id)
        user.update(profile_image: params[:profile_image])
        render json: user
    end


  def suggestions 
    token = request.headers['token']
    user_id = decode(token)
    # try with not 
    user = User.find_by!(id: user_id)
    arr = User.where.not(id: user.followings.pluck('id'))
    arr2 = arr.where.not(id: user_id)

    render json: arr2
    # map 
  end
  def new_posts 
    token = request.headers['token']
    user_id = decode(token)
    # try with not 
    user = User.find_by!(id: user_id)
    arr = User.where(id: user.followings.pluck('id'))
    arr2 = arr.where.not(id: user_id)

    render json: arr2
    # map 
  end

    private
    def render_unprocessable_entity_response(invalid)
        render json: {error: invalid.record.errors.full_messages}, status: :unprocessable_entity
      end
end