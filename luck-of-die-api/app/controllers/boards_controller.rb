class BoardsController < ApplicationController
    def index
        boards = Board.all

        render json: boards
    end
end
