require_relative '../config/environment.rb'

require 'httparty'
require 'byebug'

def fetch_and_seed_data
	url = "http://api.walmartlabs.com/v1/paginated/items?category=3944&apiKey=qg9zmd9zyj5bbsy3j3agubxs&format=json"
	response = HTTParty.get(url)
		response["items"].each do |item|

			Product.create(
				name: item["name"],
				brand_name: item["brandName"],
				color: item["color"],
				model_number: item["modelNumber"],
				category: "Electronics",
				short_description: item["shortDescription"],
				long_description: item["longDescription"],
				clearance: item["clearance"],
				parent_item_id: item["parentItemId"],
				msrp: item["msrp"],
				sale_price: item["salePrice"],
				stock: item["stock"],
				upc: item["upc"],
				category_path: item["categoryPath"],
				thumb_nail_image: item["thumbNailImage"],
				medium_image: item["mediumImage"],
				large_image: item["largeImage"],
				active: false
				)
			
		end
		# response = HTTParty.get(url)

		# while(response["next_key"]) do
		# 	#  create a produce
		# 	url = response["next_key"]
		# end
		
end


# ['Electronics,' 'Homegoods', 'Food'].each do |category|
#    WalmartAdapter.fetch_data_by_category(category)
# end

# WalmartAdapter.fetch_data_by_category('Electronics')




fetch_and_seed_data





