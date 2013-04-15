class User < ActiveRecord::Base
  attr_accessible :admin, :login
end
