class Address < ApplicationRecord
	# created with : rails g model Address member:reference
	belongs_to :member
	has_many :orders

end
