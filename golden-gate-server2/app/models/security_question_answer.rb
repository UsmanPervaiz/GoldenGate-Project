class SecurityQuestionAnswer < ApplicationRecord
	belongs_to :member
	belongs_to :security_question
	before_save :encrypt_security_question_answer

	def encrypt_security_question_answer
		salt = ENV['SALT'] #environment variable saved in application.yml (gem figaro)
		key   = ActiveSupport::KeyGenerator.new('password').generate_key(salt, 32)
		crypt = ActiveSupport::MessageEncryptor.new(key)
		answer = self.answer
		encrypted_answer = crypt.encrypt_and_sign(answer)
		self.answer = encrypted_answer
	end

end

