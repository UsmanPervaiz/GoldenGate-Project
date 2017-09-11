class OrderDetail < ApplicationRecord
  belongs_to :order
  belongs_to :product

  validates :quantity, presence: true, numericality: { only_integer: true, greater_than: 0 }
  # validates :unit_price, presence: true
  # validates :total, presence: true

  # validate :product_present
  # validate :order_present

  before_save :finalize

  private 

  # def product_present
  # 	if (product.nil?)
  # 		errors.add(:product, "is not valid or is not active.")
  # 	end
  # end

  # def order_present
  #   if order.nil?
  #     errors.add(:order, "is not a valid order.")
  #   end
  # end


  def finalize 
  	self[:unit_price] = self.product.sale_price
  	self[:total] = self.quantity * self[:unit_price]
  end

  # def unit_price 
  # 	self.product.sale_price
  # end

end
