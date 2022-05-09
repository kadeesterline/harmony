Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

 
  resources :users
  resources :rooms
  resources :room_members
  resources :replies
  resources :posts
  resources :channels

  post '/signup', to: 'users#create'
	post '/login', to: 'sessions#create'
	delete '/logout', to: 'sessions#destroy'
  get '/sessions/:user_id', to: 'sessions#show'
	get '/autologin', to: 'users#show'
  post '/room_members/join', to: 'room_members#create_with_code'
  # put '/putpicture', to: 'posts#add_picture'

  post 'rails/active_storage/direct_uploads', to: 'direct_uploads#create'
  

  get '*path',
	    to: 'fallback#index',
	    constraints: ->(req) { !req.xhr? && req.format.html? }
end
