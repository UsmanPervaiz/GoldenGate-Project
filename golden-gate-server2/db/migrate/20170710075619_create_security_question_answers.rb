class CreateSecurityQuestionAnswers < ActiveRecord::Migration[5.0]
  def change
    create_table :security_question_answers do |t|
      t.references :member
      t.references :security_question
      t.text :answer

      t.timestamps
    end
  end
end
