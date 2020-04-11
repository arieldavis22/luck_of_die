class CreateBoards < ActiveRecord::Migration[6.0]
  def change
    create_table :boards do |t|
      t.string :color
      t.string :difficulty

      t.timestamps
    end
  end
end
