Rails.application.routes.draw do
  resources :users, :boards, :cups

  patch "/users/:id/wonE", to: "users#wonE"
  patch "/users/:id/lostE", to: "users#lostE"

  patch "/users/:id/wonM", to: "users#wonM"
  patch "/users/:id/lostM", to: "users#lostM"

  patch "/users/:id/wonH", to: "users#wonH"
  patch "/users/:id/lostH", to: "users#lostH"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
