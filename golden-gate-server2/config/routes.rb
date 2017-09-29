Rails.application.routes.draw do

  # devise_for :members
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do 
  	namespace :v1 do
  		resources :members, only: [:show, :update, :destroy]
      put "update_password", to: "members#update_password"
  		post 'check_validity', to: 'members#check_validity'
      post 'create_new_account', to: 'members#create', as: "create_new_account"
  		# resources :sign_in, only: [:create]
  		post 'sign_in', to: 'sign_in#create'
  		resources :order_details, only: [:create, :update, :destroy]
  		resources :products, only: [:index]
  		get 'carts/show', to: "carts#show"
  		post 'security_questions', to: "security_questions#create"
      resources :addresses, only: [:create, :update, :destroy]
      put "set_default_address/:id", to: "addresses#set_default_address"
  	  
    end
  end
 
end
