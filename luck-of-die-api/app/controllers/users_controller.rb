class UsersController < ApplicationController

    def index
        users = User.all

        render json: users.sort_by {|user| user.points}.reverse, include: [:cups]
    end

    def show
        user = User.find(params[:id])

        render json: user, include: [:cups]
    end

    def create
        user = User.find_or_create_by(
            username: params[:username]
        )

        render json: user, include: [:cups]
    end

#===============================================================

    def wonE
        user = User.find(params[:id])
        user.update(points: user.points + 1)

        render json: user, include: [:cups]
    end

    def lostE
        user = User.find(params[:id])
        user.update(points: user.points - 1)

        render json: user, include: [:cups]
    end

#===============================================================

    def wonM
        user = User.find(params[:id])
        user.update(points: user.points + 10)

        render json: user, include: [:cups]
    end
    def lostM
        user = User.find(params[:id])
        user.update(points: user.points - 10)

        render json: user, include: [:cups]
    end

#===============================================================

def wonH
    user = User.find(params[:id])
    user.update(points: user.points + 25)

    render json: user, include: [:cups]
end
def lostH
    user = User.find(params[:id])
    user.update(points: 0)

    render json: user, include: [:cups]
end

#===============================================================

    def destroy
        user = User.find(params[:id])
        user.destroy

        render json: {}
    end
end
