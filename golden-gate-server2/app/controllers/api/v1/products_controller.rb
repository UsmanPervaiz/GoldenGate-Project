class Api::V1::ProductsController < ApplicationController
	# created using:
	# rails g controller Products index

  def index
  	products = Product.all
  	render json: products
  end

end
