class Api::V1::MembersController < ApplicationController
	
	def check_validity
		member = Member.new(member_params)
		member.password = params[:password]
		if(member.valid?)
			security_question_instances = SecurityQuestion.all
			security_questions = security_question_instances.map{ |question_instance| question_instance.question }
			byebug
			render json: security_questions
		else 
			render json: {error: member.errors}, status: 422
	    end
	end


	def create 
		member = Member.new(member_params)
		member.password = params[:password]
		if (member.save)
			token = JWT.encode({member_id: member.id}, ENV["JWT_SECRET"], ENV["JWT_ALGORITHM"])
			render json: {memberName: member.full_name, token: token}
		else 
			render json: {error: member.errors}, status: 422
		end
		
	end

	def update

	end
	
	def destroy

	end

	private 

	def member_params
		params.require(:member).permit(:first_name, :last_name, :email, :gender, :birthday, :password)
	end

end

