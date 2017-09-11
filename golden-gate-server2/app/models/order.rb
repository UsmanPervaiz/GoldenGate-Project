class Order < ApplicationRecord
  belongs_to :member
  belongs_to :address
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
