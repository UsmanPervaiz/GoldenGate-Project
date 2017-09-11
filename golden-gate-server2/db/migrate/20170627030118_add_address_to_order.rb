class AddAddressToOrder < ActiveRecord::Migration[5.0]
	# created using: rails g migration AddAddressToOrder address:references
  def change
    add_reference :orders, :address, foreign_key: true
  end
  
end
