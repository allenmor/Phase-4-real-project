Rails.application.routes.draw do

  post '/newuser', to: 'users#newuser'
  post '/login', to: 'users#login'
  get '/me', to: 'users#me'

  get '/users', to: 'users#index'
  get '/posts', to: 'posts#index'
  get '/comments', to: 'comments#index'
  get '/postcomments/:id', to: 'comments#post_comments'
  post '/newcomment', to: 'comments#new_comment'
end
