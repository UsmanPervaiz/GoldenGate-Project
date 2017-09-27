class Address < ApplicationRecord
	# created with : rails g model Address member:reference
	belongs_to :member
	has_many :orders
	before_save :capitalize_name

	def capitalize_name
  		self.first_name = self.first_name.capitalize #this will capitalize the first letter and lowercase rest of the word.
  		self.last_name = self.last_name.capitalize
  	end

end
