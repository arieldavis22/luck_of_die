Rails.application.routes.draw do
  resources :users, :boards, :cups

  patch "/users/:id/won", to: "users#won"
  patch "/users/:id/lost", to: "users#lost"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
