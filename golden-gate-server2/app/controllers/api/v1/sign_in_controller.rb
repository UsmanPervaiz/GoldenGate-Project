class Api::V1::SignInController < ApplicationController
 

  def create
  	downcased_email = params[:email].downcase
  	member = Member.find_by(email: downcased_email)
  	
  		if(member.present?) 

			if (member.valid_password?(params[:sign_in][:password]))

				token = JWT.encode(
					 {member_id: member.id}, ENV["JWT_SECRET"], ENV["JWT_ALGORITHM"]
					)
				render json: {memberName: member.full_name, token: token}

			else 
				render json: {error: "The password you entered is wrong."}, status: 422
			end
		else 
			render json: {error: "We cannot find an account with this email address."}, status: 422
		end

  end


end