class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :authenticate_user!
  before_action :configur_permited_parameters, if: :devise_controller?

  def configur_permited_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:nickname])
  end
end
