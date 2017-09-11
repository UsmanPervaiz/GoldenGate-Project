class CreateProducts < ActiveRecord::Migration[5.0]
  def change
    create_table :products do |t|

      t.string :name
      t.string :brand_name
      t.string :color
      t.integer :model_number
      t.string :category
      t.text :short_description
      t.text :long_description
      t.boolean :clearance, default: false
      t.integer :parent_item_id
      t.decimal :msrp, precision: 7, scale: 2
      t.decimal :sale_price, precision: 7, scale: 2
      t.string :stock, default: "Not Available"
      t.integer :upc
      t.text :category_path
      t.text :thumb_nail_image
      t.text :medium_image
      t.text :large_image
      t.boolean :active, default: false


      t.timestamps
    end
  end
end
