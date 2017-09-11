class RemoveColumnOrderStatusIdFromOrders < ActiveRecord::Migration[5.0]
  def change
  	remove_column :orders, :order_status_id
  end
end
