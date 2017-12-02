class Member < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable 
         # :validatable
         #validatable creates all needed validations for a user email and password. It is optional, given you may want
         #to create validations by yourself. It automatically validates if the email is present, unique and its format is valid.
         #Also tests presence of password, confirmation and length
  has_many :orders
  has_many :addresses
  has_many :security_question_answers
  has_many :security_questions, through: :security_question_answers
  validates_presence_of :first_name, message: "First Name cannot be blank!"
  validates_presence_of :last_name, message: "Last Name cannot be blank!"
  # validates_presence_of :birthday, message: "Birth dates cannot be blank!"
  validates_date :birthday, :before => lambda {Date.current},  :invalid_date_message => "Invalid Date of Birth!", :before_message => "Present and/or future birth date not allowed." # for gem "validates_Timeliness", ruby date format "2017-07-04" (y-m-d)
  validates_presence_of :email, :message => "Email cannot be blank!"
  validates :email, uniqueness: {:message => "An account already exists with this email!"}
  validates_format_of :email, :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i, :message => "Email is Invalid!"
   # :gender
  validates_format_of :first_name, with: /\A[a-zA-z]+\z/, message: "Only letters allowed for First Name!"
  validates_format_of :last_name, with: /\A[a-zA-z]+\z/, message: "Only letters allowed for Last Name!"
  validate :password_complexity# this is to add custom devise password validations on create and also when updating, using devise_security_extension is recommended though. WE can also say on: :create - if we only want this validation when creating and not when updating.
  validate :password_cannot_be_blank_on_creation, on: :create
  before_save {|member| member.email = member.email.downcase}
  before_save :save_signup_date, :capitalize_name, :lowercase_email
  # we use before create here, so it only does it once in the lifecycle, when an instance is created.
  # if we use before_save, then it will run this method everytime we update or re-save and we dont want that.

  def full_name
  	"#{self.first_name} #{self.last_name}"
  end

private

  def password_complexity # password_complexity to be used with devise for custom password validations
  	if(password.present?) 	
  		if(password.match(/^[a-zA-Z]/).nil?)
  			self.errors.add :password_no_numbers, "Password cannot begin with a number!"
  		elsif(password.length < 6)
  			self.errors.add :password_min_length, "Minimum password length is 6 characters!"
  		elsif(password.length > 15)
  			self.errors.add :password_max_length, "Maximum password length is 15 characters!"
      end 		
  	end
  end

  def password_cannot_be_blank_on_creation
    if(!password.present?)
      self.errors.add :password_is_blank, "Password cannot be blank!"
    end
  end

  def capitalize_name
  	self.first_name = self.first_name.capitalize #this will capitalize the first letter and lowercase rest of the word.
  	self.last_name = self.last_name.capitalize
  end

  def save_signup_date
  	self.signed_up_on = Date.today
  end

  def lowercase_email
  	self.email = self.email.downcase
  end


end



