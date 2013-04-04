class SearchController < ApplicationController
  
  def index 
  end
  
  def find
    lista = Ramal.search_by_name(params[:term])
    render json: lista.map(&:name)
  end
  
  def search_ramal 
    p "tentando obter um ramal"
    p params[:busca]
    lista = Ramal.search_by_name(params[:busca])
    render json: lista
  end
  
end
