class RamalController < ApplicationController

	def update
		p 'atualizando o ramal'
		ramal = Ramal.new(params[:ramal])
		p ramal
	end

	def requestramal 
		@ramal = Ramal.find(params[:id])
		respond_to do |format|
      		format.html 
      		format.json { render json: @ramal }
      	end
	end 

end
