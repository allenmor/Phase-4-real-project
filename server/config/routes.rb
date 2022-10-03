Rails.application.routes.draw do

  post '/newuser', to: 'users#newuser'
  post '/login', to: 'users#login'
  get '/me', to: 'users#me'

  get '/users', to: 'users#index'
  get '/posts', to: 'posts#index'
  get '/comments', to: 'comments#index'
  get '/postcomments/:id', to: 'comments#post_comments'
  post '/newcomment', to: 'comments#new_comment'
  post '/newlike', to: 'likes#new_like'
  post '/newpost', to: 'posts#new_post'
  get '/userposts/:id', to: 'posts#user_posts'

  patch '/updatename', to: 'users#update_name'
  patch '/updateimage', to: 'users#update_image'
  get '/suggestions', to: 'users#suggestions'
  post '/follows', to: 'follows#create' 
end
