class AddDefaultToUsers < ActiveRecord::Migration[6.0]
  def change
    change_column_default(:users, :points, from: nil, to: 10)
  end
end
