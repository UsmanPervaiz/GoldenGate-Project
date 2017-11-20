Rails.application.routes.draw do

  # devise_for :members
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do 
  	namespace :v1 do
  		resources :members, only: [:show, :update, :destroy]
      put "update_password", to: "members#update_password"
      put "update_password_with_forgot_password", to: "members#update_password_with_forgot_password"
  		post 'check_validity', to: 'members#check_validity'
      post 'create_new_account', to: 'members#create', as: "create_new_account"
      post 'check_if_member_exists', to: 'members#check_if_member_exists?'
  		# resources :sign_in, only: [:create]
  		post 'sign_in', to: 'sign_in#create'
  		resources :order_details, only: [:create, :update, :destroy]
  		resources :products, only: [:index]
  		get 'carts/show', to: "carts#show"
      resources :security_questions, only: [:index, :create]
      resources :addresses, only: [:create, :update, :destroy]
      put "set_default_address/:id", to: "addresses#set_default_address"
  	  post "verify_security_question_answer/:question_id", to: "security_questions#verify_security_question_answer"
    end
  end
 
end