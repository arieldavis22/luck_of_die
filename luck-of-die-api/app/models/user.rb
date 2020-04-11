class User < ApplicationRecord
    has_many :cups
    has_many :boards, through: :cups
end
