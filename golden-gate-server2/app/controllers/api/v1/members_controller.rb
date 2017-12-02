class Api::V1::MembersController < ApplicationController
	
	def show
		decoded_token = authorize_account(request.headers["HTTP_TOKEN"]).first
		member = Member.find(decoded_token["member_id"])

		render json: {
			memberInfo: {
              firstName: member.first_name, 
              lastName: member.last_name, 
              email: member.email, 
              gender: member.gender, 
              dob: member.birthday 
            } 
        }
	end

	def check_validity
		member = Member.new(member_params)
		if(member.valid?)
			security_question_instances = SecurityQuestion.all
			security_questions = security_question_instances.map{ |question_instance| question_instance.question }
			
			render json: security_questions
		else 
			render json: {error: member.errors}, status: 422
	    end
	end


	def create 
		member = Member.new(member_params)
		if (member.save)
			token = JWT.encode({member_id: member.id}, ENV["JWT_SECRET"], ENV["JWT_ALGORITHM"])
			render json: {memberName: member.full_name, token: token}
		else 
			render json: {error: member.errors}, status: 422
		end
		
	end

	def update
		
		decoded_token = authorize_account(request.headers["HTTP_TOKEN"]).first

		if(decoded_token.present?)
			member = Member.find(decoded_token["member_id"])
			params["member"].each do |key, value|
				if(value.present?)
					member.assign_attributes("#{key}": value)
					if(member.valid?)
						member.save # if you have any password validations on the user model, make sure they are only on when creating a new user (on: :create), otherwise you won't be able to update without password.
					end
				end
		    end
		    if(member.errors.present?)
		    	render json: {error: [member.errors.full_messages]}, status: 422
		    end
		    
		end	
	end

	def update_password
		decoded_token = authorize_account(request.headers["HTTP_TOKEN"]).first
		member = Member.find(decoded_token["member_id"])
		if(member.valid_password?(params["currentPassword"]))
			member.update(password: params["password"])
			render json: {passwordUpdated: "Password Updated Successfully!"}
		else render json: {error: "Incorrect Current Password!"}, status: 422
		end
	end

	def check_if_member_exists?
		member = Member.find_by(email: params["memberEmail"])
		if(member)
			render json: "ok"
		else
			render json: {error: "No account found with this email!"}, status: 422
		end
	end

	def update_password_with_forgot_password
		
		member = Member.find_by(email: params["memberEmail"])
		if( member.update_attributes(password: params["newPassword"]) )
			member.update(password: params["newPassword"])
			render json: {passwordUpdated: "Password Updated Successfully"}
		else 
			render json: {error: member.errors}, status: 422
		end

	end
	
	def destroy

	end

	private 

	def member_params
		params.require(:member).permit(:first_name, :last_name, :email, :gender, :birthday, :password)
	end

end


