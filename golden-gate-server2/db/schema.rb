# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170927235349) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "addresses", force: :cascade do |t|
    t.integer  "member_id"
    t.string   "address_type"
    t.boolean  "default",        default: false
    t.string   "first_name"
    t.string   "last_name"
    t.text     "address_line_1"
    t.text     "address_line_2"
    t.string   "city"
    t.string   "state"
    t.string   "zip_code"
    t.string   "phone"
    t.datetime "created_at",                     null: false
    t.datetime "updated_at",                     null: false
    t.index ["member_id"], name: "index_addresses_on_member_id", using: :btree
  end

  create_table "members", force: :cascade do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "gender",                 default: "not provided"
    t.date     "birthday"
    t.boolean  "vip_member",             default: false
    t.string   "email",                  default: "",             null: false
    t.string   "encrypted_password",     default: "",             null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,              null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                                      null: false
    t.datetime "updated_at",                                      null: false
    t.date     "signed_up_on"
    t.index ["email"], name: "index_members_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_members_on_reset_password_token", unique: true, using: :btree
  end

  create_table "order_details", force: :cascade do |t|
    t.integer  "order_id"
    t.integer  "product_id"
    t.integer  "quantity"
    t.decimal  "unit_price", precision: 7, scale: 2
    t.decimal  "total",      precision: 7, scale: 2
    t.datetime "created_at",                         null: false
    t.datetime "updated_at",                         null: false
    t.index ["order_id"], name: "index_order_details_on_order_id", using: :btree
    t.index ["product_id"], name: "index_order_details_on_product_id", using: :btree
  end

  create_table "orders", force: :cascade do |t|
    t.integer  "member_id"
    t.decimal  "subtotal",     precision: 7, scale: 2
    t.decimal  "tax",          precision: 7, scale: 2
    t.decimal  "shipping",     precision: 7, scale: 2
    t.decimal  "total",        precision: 7, scale: 2
    t.datetime "created_at",                                              null: false
    t.datetime "updated_at",                                              null: false
    t.string   "order_status",                         default: "incart"
    t.integer  "address_id"
    t.index ["address_id"], name: "index_orders_on_address_id", using: :btree
    t.index ["member_id"], name: "index_orders_on_member_id", using: :btree
  end

  create_table "products", force: :cascade do |t|
    t.string   "name"
    t.string   "brand_name"
    t.string   "color"
    t.string   "model_number"
    t.string   "category"
    t.text     "short_description"
    t.text     "long_description"
    t.boolean  "clearance",                                 default: false
    t.string   "parent_item_id"
    t.decimal  "msrp",              precision: 7, scale: 2
    t.decimal  "sale_price",        precision: 7, scale: 2
    t.string   "stock",                                     default: "Not Available"
    t.string   "upc"
    t.text     "category_path"
    t.text     "thumb_nail_image"
    t.text     "medium_image"
    t.text     "large_image"
    t.boolean  "active",                                    default: false
    t.datetime "created_at",                                                          null: false
    t.datetime "updated_at",                                                          null: false
  end

  create_table "security_question_answers", force: :cascade do |t|
    t.integer  "member_id"
    t.integer  "security_question_id"
    t.text     "answer"
    t.datetime "created_at",           null: false
    t.datetime "updated_at",           null: false
    t.index ["member_id"], name: "index_security_question_answers_on_member_id", using: :btree
    t.index ["security_question_id"], name: "index_security_question_answers_on_security_question_id", using: :btree
  end

  create_table "security_questions", force: :cascade do |t|
    t.text     "question"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "order_details", "orders"
  add_foreign_key "order_details", "products"
  add_foreign_key "orders", "addresses"
  add_foreign_key "orders", "members"
end
