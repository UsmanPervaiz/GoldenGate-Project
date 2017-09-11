class Product < ApplicationRecord
	validates :name, uniqueness: true
	validates :model_number, uniqueness: true
	# making sure that a record is not entered into database twice.

	has_many :order_details
	has_many :orders, through: :order_details

	# we can also add a default_scope, so when we do SELECT * FROM THIS TABLE
	# it will only return items set in the default_scope, eg:
	# default_scope { where(stock: "Available")}
end
