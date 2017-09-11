class SecurityQuestionAnswer < ApplicationRecord
	belongs_to :member
	belongs_to :security_question
end
