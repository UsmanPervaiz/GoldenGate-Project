class RemoveColumn < ActiveRecord::Migration[5.0]
  def change
  	remove_column :members, :authentication_token
  end
end
