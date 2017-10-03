class Api::V1::SecurityQuestionsController < ApplicationController

	# def show 

	# 	security_question_instances = SecurityQuestion.all
	# 	security_questions = security_question_instances.map{ |question_instance| question_instance.question }
	# 	render json: security_questions
	# end

	def create
		byebug
		decoded_token = authorize_account(request.headers["HTTP_TOKEN"]).first
		array_of_question_ids_and_answers = []
		
		params["questionsAndAnswers"].each do |ques, ans|
			SecurityQuestion.all.each do |question|
				if(question.question === ques)
					array_of_question_ids_and_answers.push({question.id => ans})
					SecurityQuestionAnswer.create(member_id: decoded_token["member_id"], security_question_id: question.id, answer: ans)
				end
			end
		end
		
	end

end