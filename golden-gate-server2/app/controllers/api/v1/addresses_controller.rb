class Api::V1::AddressesController < ApplicationController

  def create
  	decoded_token = authorize_account(request.headers["HTTP_TOKEN"])

  	if(decoded_token)
  		member = Member.find(decoded_token.first["member_id"])
  		address = member.addresses.create(address_params)
  		
  		render json: {memberAddresses: member.addresses} 
  	else
  		render json: {error: "Please sign in!"}, status: 422
  	end
    
  end

  private

  def address_params
  	params.require(:new_address_data).permit(:address_type, :default, :first_name, :last_name, :address_line_1, :address_line_2, :city, :state, :zip_code, :phone)
  end

end