# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Board.destroy_all
Cup.destroy_all

User.create(username: "Apple")
User.create(username: "Pan")
User.create(username: "Po")


Board.create(color: "green", difficulty: "easy")
Board.create(color: "yello", difficulty: "medium")
Board.create(color: "red", difficulty: "hard")