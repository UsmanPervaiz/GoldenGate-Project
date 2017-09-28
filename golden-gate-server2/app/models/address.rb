class Address < ApplicationRecord
	# created with : rails g model Address member:reference
	belongs_to :member
	has_many :orders
	before_save :upcase_data

	def upcase_data
		self.address_type = self.address_type.upcase
  		self.first_name = self.first_name.upcase 
  		self.last_name = self.last_name.upcase
  		self.address_line_1 = self.address_line_1.upcase
  		self.address_line_2 = self.address_line_2.upcase
  		self.city = self.city.upcase
  		self.state = self.state.upcase
  	end

end
