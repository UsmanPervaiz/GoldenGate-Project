class CreateOrderDetails < ActiveRecord::Migration[5.0]
  def change
    create_table :order_details do |t|
      t.references :order, foreign_key: true
      t.references :product, foreign_key: true
      t.integer :quantity
      t.decimal :unit_price, precision: 7, scale: 2
      t.decimal :total, precision: 7, scale: 2

      t.timestamps
    end
  end
end