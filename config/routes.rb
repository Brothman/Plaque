Rails.application.routes.draw do
  root to: 'static_pages#root'

  mount ActionCable.server, at: '/cable'  
end
