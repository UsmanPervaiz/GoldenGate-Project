class Api::V1::AddressesController < ApplicationController

  def create
  	decoded_token = authorize_account(request.headers["HTTP_TOKEN"])
  	member = Member.find(decoded_token.first["member_id"])
  	if(decoded_token)
  		if(address_params[:default])

  			default_address = Address.find_by(member_id: member.id, address_type: address_params[:address_type].upcase , default: true) 
  			if(default_address)
  				default_address.update(default: false)
  			end
  			address = member.addresses.create(address_params)
  			render json: {memberAddresses: member.addresses}
  		else 
  			address = member.addresses.create(address_params)
  			render json: {memberAddresses: member.addresses}
  		end
  	else
  		render json: {error: "Please sign in!"}, status: 422
  	end   
  end

  def update

  end

  def set_default_address
  	decoded_token = authorize_account(request.headers["TOKEN"])
  	address_to_set_as_default = Address.find(params[:id])
  	if(decoded_token)
  		member = Member.find(decoded_token.first["member_id"])
  		address_to_remove_as_default = Address.find_by(member_id: member.id, address_type: address_to_set_as_default.address_type, default: true)
  		if(address_to_remove_as_default)
  			address_to_remove_as_default.update(default: false)
  		end
  		address_to_set_as_default.update(default: true)
  		render json: {memberAddresses: member.addresses}
  	else
  		render json: {error: "Please sign in!"}, status: 422
  	end
  end

  def destroy 
  	decoded_token = authorize_account(request.headers["TOKEN"])
  	if(decoded_token)
  		Address.destroy(params[:id])
  	end
  	member = Member.find(decoded_token.first["member_id"])
  	render json: { memberAddresses: member.addresses }
  end

  private

  def address_params
  	params.require(:new_address_data).permit(:address_type, :default, :first_name, :last_name, :address_line_1, :address_line_2, :city, :state, :zip_code, :phone)
  end

end