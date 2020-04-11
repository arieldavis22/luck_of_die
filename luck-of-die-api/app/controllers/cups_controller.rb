class CupsController < ApplicationController
    def index
        cups = Cup.all

        render json: cups
    end

    def show
        cup = Cup.find(params[:id])

        render json: cup
    end
end
