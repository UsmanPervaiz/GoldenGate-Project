class SecurityQuestion < ApplicationRecord
	validates :question, uniqueness: true
	 
end
