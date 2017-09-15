# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

security_questions = SecurityQuestion.create([
								{question: "What was your childhood nickname?"},
								{question: "What was your favorite food as a child?"},
								{question: "What school did you attend for sixth grade?"},
								{question: "What is the name of your favorite childhood friend?"},
								{question: "What was the name of the hospital where you were born?"},
								
								{question: "What is your favorite team?"},
								{question: "What is your favorite movie?"},
								{question: "In what town was your first job?"},
								{question: "What was the make and model of your first car?"},
								{question: "In what city or town did your mother and father meet?"},
								
								{question: "What is your pet's name?"},
								{question: "What is your favorite number?"},
								{question: "What is your favorite TV show?"},
								{question: "What are the last four digits of your mobile number?"},
								{question: "What was the name of the company where you had your first job?"},
								])