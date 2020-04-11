class CreateCups < ActiveRecord::Migration[6.0]
  def change
    create_table :cups do |t|
      t.integer :dice
      t.boolean :has_won
      t.integer :user_id
      t.integer :board_id

      t.timestamps
    end
  end
end
