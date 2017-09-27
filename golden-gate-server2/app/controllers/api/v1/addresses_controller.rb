class Api::V1::AddressesController < ApplicationController

  def create
  	byebug
  
  end

  private

  def address_params
  	params.require(:newAddressData).permit(:newAddressLine1, :newAddressLine2, :newAddressCity, :newAddressState, :newAddressZipCode, :newAddressFirstName, :newAddressLastName, :newAddressPhoneNumber)
  end

