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

  get '*path',
	    to: 'fallback#index',
	    constraints: ->(req) { !req.xhr? && req.format.html? }
end
