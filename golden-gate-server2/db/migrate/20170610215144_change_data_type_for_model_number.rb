class ChangeDataTypeForModelNumber < ActiveRecord::Migration[5.0]
  def change
  	change_column :products, :model_number, :string
  	change_column :products, :parent_item_id, :integer, :limit => 30
  	change_column :products, :upc, :integer, :limit => 20
  end
end
