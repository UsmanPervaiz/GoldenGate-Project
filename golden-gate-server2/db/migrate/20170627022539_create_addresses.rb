class CreateAddresses < ActiveRecord::Migration[5.0]
  def change
    create_table :addresses do |t|
      t.references :member, index: true
      t.string :type
      t.boolean :default, default: false
      t.string :first_name
      t.string :last_name
      t.text :address_line_1
      t.text :address_line_2
      t.string :city
      t.string :state
      t.string :zip_code
      t.string :phone


      t.timestamps
    end
  end
end
