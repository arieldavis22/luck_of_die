class UsersController < ApplicationController

    def index
        users = User.all

        render json: users
    end

    def show
        user = User.find(params[:id])

        render json: user
    end

    def create
        user = User.find_or_create_by(
            username: params[:username]
        )

        render json: user
    end

    def won
        user = User.find(params[:id])
        user.boards.map do |board|
            if board.difficulty === "easy"
                user.update(points: user.points + 1)
            elsif board.difficulty === "medium"
                user.update(points: user.points + 3)
            elsif board.difficulty === "hard"
                user.update(points: user.points + 5)
            end
        end

        render json: user
    end

    def lost
        user = User.find(params[:id])
        user.boards.map do |board|
            if board.difficulty === "easy"
                user.update(points: user.points - 1)
            elsif board.difficulty === "medium"
                user.update(points: user.points - 3)
            elsif board.difficulty === "hard"
                user.update(points: user.points - 5)
            end
        end

        render json: user
    end

    def destroy
        user = User.find(params[:id])
        user.destroy

        render json: {}
    end
end
