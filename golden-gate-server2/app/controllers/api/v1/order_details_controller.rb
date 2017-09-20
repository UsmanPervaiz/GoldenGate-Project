class Api::V1::OrderDetailsController < ApplicationController
	# created using:
	# rails g controller OrderDetails create update destroy
	
  def create
  	decoded_token = authorize_account(params[:token])
	 if (decoded_token.present?)
	    member = Member.find(decoded_token.first['member_id'])
	    order = member.orders.new()
	    order.save
      #Order: before_create: set_order_status, set_tax, set_shipping
	    order_detail = order.order_details.new(product_id: params[:product_id], quantity: params[:quantity])
		  order_detail.save
      #OrderDetail: before_save: def finalize self[:unit_price] = self.product.sale_price; self[:total] = self.quantity * self[:unit_price]; end

		  order_subtotal(order)
      #helper_method: order.subtotal = order.order_details.collect { |order_detail| order_detail.total }.inject(0){ |acc,num| acc + num }
		  order_tax(order)
      #helper_method: order.tax = (order.subtotal * 8.75) / 100
  		order_total(order)
      #order.total = order.subtotal + (order.tax + order.shipping)
      order.save	
  		render json: { currentOrderDetails: current_order_details(member.id), order: order }
	else 
		render json: {error: "Please sign in."}, status: 422
	end

  end

  def update
 
  	decoded_token = authorize_account(params[:token])

  	if( decoded_token.present?)
  		order = Order.find_by(member_id: decoded_token.first['member_id'], order_status: "incart")
  		order_detail = OrderDetail.find_by(order_id: order.id, product_id: params[:product_id])
  		
  		if(order_detail.present?)
  			
  			order_detail.quantity = params[:quantity]
  			order_detail.save
  			order_subtotal(order)
  			order_tax(order)
  			order_total(order)
  			order.save
  			render json: { currentOrderDetails: current_order_details(decoded_token.first['member_id']), order: order }
  		else 
  			
  			order_details = order.order_details.new(product_id: params[:product_id], quantity: params[:quantity])
  			order_details.save
  			order_subtotal(order)
  			order_tax(order)
  			order_total(order)
  			order.save
  			render json: { currentOrderDetails: current_order_details(decoded_token.first['member_id']), order: order }
  		end

  	end

  end

  def destroy

  	decoded_token = authorize_account(request.headers["HTTP_TOKEN"])
  	if(decoded_token.present?)
  		order = Order.find_by(member_id: decoded_token.first['member_id'], order_status: "incart")
  		order_detail = OrderDetail.find_by(order_id: order.id, product_id: params[:id])
  		order_detail.delete
  		order_subtotal(order)
  		order_tax(order)
  		order_total(order)
  		order.save
  		if(order.order_details.empty?)
  			order.delete
  			render json: { currentOrderDetails: [], order: {} }
  		else
  			render json: { currentOrderDetails: current_order_details(decoded_token.first['member_id']), order: order } 
  	    end
  	else 
  		render json: {error: "Please sign in..."}, status: 422
  	end

  end

  private 

  def order_detail_params
  	params.require(:product).permit(:product_id, :quantity, :token)
   
  end


end
