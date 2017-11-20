class Api::V1::SecurityQuestionsController < ApplicationController


	def index 
		
		member = Member.find_by(email: params["forgotPasswordEmail"])
		if(member) 
		#member has_many :security_questions, through: :security_question_answer
			render json: {security_questions: member.security_questions}
		else 
			render json: {error: "No account exists with the email provided!"}, status: 422
		end
	end

	def create
		decoded_token = authorize_account(request.headers["HTTP_TOKEN"]).first #only to retrieve member.id and not to authenticate
		# array_of_question_ids_and_answers = []	
		params["questionsAndAnswers"].each do |ques, ans|
			SecurityQuestion.all.each do |question|
				if(question.question === ques)
					# array_of_question_ids_and_answers.push({question.id => ans})
					SecurityQuestionAnswer.create(member_id: decoded_token["member_id"], security_question_id: question.id, answer: ans)
				end
			end
		end
		
	end

	def verify_security_question_answer
		
		member = Member.find_by(email: params["memberEmail"])
		security_question_id = params["question_id"]
		security_question_answer = SecurityQuestionAnswer.find_by(member_id: member.id, security_question_id: security_question_id)
		key = ActiveSupport::KeyGenerator.new('password').generate_key(ENV['SALT'], 32)
		crypt = ActiveSupport::MessageEncryptor.new(key)
		
		if(crypt.decrypt_and_verify(security_question_answer.answer) == params["memberAnswer"])
			render json: {member_answer: true}
		else 
			render json: {member_answer: false}, status: 422
		end

	end

end