class CreateSecurityQuestions < ActiveRecord::Migration[5.0]
  def change
    create_table :security_questions do |t|
    	t.text :question
      	t.timestamps
    end
  end
end
