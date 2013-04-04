class Ramal < ActiveRecord::Base
  attr_accessible :name, :number, :local
  
  def self.search_by_name(name)
    Ramal.where('name like ?', name + '%')
  end
  
end
