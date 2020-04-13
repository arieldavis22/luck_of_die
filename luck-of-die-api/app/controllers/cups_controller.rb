class CupsController < ApplicationController
    def index
        cups = Cup.all

        render json: cups
    end

    def show
        cup = Cup.find(params[:id])

        render json: cup
    end

    def create

        cup = Cup.find_or_create_by(
            dice: params[:dice],
            user_id: params[:user_id],
            board_id: params[:board_id],
            has_won: params[:has_won])

            render json: cup
    end

    def update
        cup = Cup.find(params[:id])
        cup.update(has_won: cup.has_won)
        render json: cup
    end

    def destroy
        cup = Cup.find(params[:id])
        cup.destroy

        render json: {}
    end
end
