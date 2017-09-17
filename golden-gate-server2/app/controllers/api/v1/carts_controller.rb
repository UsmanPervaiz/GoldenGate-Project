class Api::V1::CartsController < ApplicationController
 # created using:
 # rails g controller Carts show


  def show	
  	decoded_token = authorize_account(request.headers["HTTP_TOKEN"])
  	member = Member.find(decoded_token.first["member_id"])
  	if(decoded_token.present?)
  		order = Order.find_by(member_id: decoded_token.first["member_id"], order_status: "incart")
  		if(order.present?)
  			render json: { 
            currentOrderDetails: current_order_details(decoded_token.first["member_id"]), #calling a helper method.
            order: order, 
            memberInfo: {
              firstName: member.first_name, 
              lastName: member.last_name, 
              email: member.email, 
              gender: member.gender, 
              dob: member.birthday 
            } 
        }
  		else 
  			render json: { 
            currentOrderDetails: [], 
            order: {}, 
            memberInfo: {
              firstName: member.first_name, 
              lastName: member.last_name, 
              email: member.email, 
              gender: member.gender, 
              dob: member.birthday 
            } 
        }
  	  end
  	else 
  		render json: {error: "you sent me errors."}
    end
  end

end
