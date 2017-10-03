class ChangeDataTypeForModelNumber < ActiveRecord::Migration[5.0]
  def change
  	change_column :products, :model_number, :string
  	change_column :products, :parent_item_id, :string
  	change_column :products, :upc, :string
  end
end
