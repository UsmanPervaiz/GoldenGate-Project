class ApplicationController < ActionController::Base
helper_method :authorize_account, :current_order_details, :order_subtotal, :order_total, :order_tax
before_action :configure_permitted_parameters, if: :devise_controller?

private 


	def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:first_name, :last_name, :email, :password, :password_confirmation])
    end

	def authorize_account(token)
		begin
		decoded_token = JWT.decode(token, ENV['JWT_SECRET'], true, { algorithm: ENV['JWT_ALGORITHM'] })
		decoded_token
    	rescue JWT::DecodeError
      	 nil
    	end
	end

	def current_order_details(member_id) 
		product_details = []
	  	order = Order.find_by(member_id: member_id, order_status: "incart") #If you use one of the more generic finder syntaxes (like find_by_field_name), the assumption is that if it isn't there, that is an acceptable situation so just return nil.	
  		order.products.each do |product| 
	 		order_detail = OrderDetail.find_by(product_id: product.id, order_id: order.id)
	 		product_quantity = order_detail.quantity
	 		quantity_and_product = {product_quantity => product}
	 		product_details.push(quantity_and_product)
	 			
		end 
			  
		return product_details
  	end

  	def order_subtotal(order)
  		order.subtotal = order.order_details.collect { |order_detail| order_detail.total }.inject(0){ |acc,num| acc + num }
  	end

	def order_tax(order)
  		order.tax = (order.subtotal * 8.75) / 100
  	end

  	def order_total(order)
  		order.total = order.subtotal + (order.tax + order.shipping)
  	end

end

  # 	self.order_details.collect { |order_detail| order_detail.valid? ? (order_detail.quantity * order_detail.unit_price) : 0 }.inject(0){ |acc, num| acc + num}


