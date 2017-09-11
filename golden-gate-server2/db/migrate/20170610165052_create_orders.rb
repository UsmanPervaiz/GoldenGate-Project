class CreateOrders < ActiveRecord::Migration[5.0]
  def change
    create_table :orders do |t|
      t.references :member, foreign_key: true
      t.references :order_status, foreign_key: true
      t.decimal :subtotal, precision: 7, scale: 2
      t.decimal :tax, precision: 7, scale: 2
      t.decimal :shipping, precision: 7, scale: 2
      t.decimal :total, precision: 7, scale: 2

      t.timestamps
    end
  end
end

