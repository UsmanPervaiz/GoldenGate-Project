class Order < ApplicationRecord
  belongs_to :member
  belongs_to :address, optional: true #In Rails 5, whenever we define a belongs_to association, it is required to have the associated record present by default. It triggers validation error if associated record is not present. We can pass optional: true to the belongs_to association which would remove this validation check.
  has_many :order_details
  has_many :products, through: :order_details

  before_create :set_order_status, :set_tax, :set_shipping
  

  def set_order_status # this will automatically set the orderstatus to incart by default, whenevr a new order is created.
  	self.order_status = "incart"
  end

  def set_tax
  	self.tax = 0
  end

  def set_shipping
  	self.shipping = 9.99
  end

end
