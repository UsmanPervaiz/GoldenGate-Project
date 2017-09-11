class AddColumnToMembers < ActiveRecord::Migration[5.0]
  def change
    add_column :members, :signed_up_on, :date
    change_column :members, :gender, :string, default: "not provided"
  end
end
