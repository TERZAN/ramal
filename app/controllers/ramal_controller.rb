class RamalController < ApplicationController

	def update
		ramal = Ramal.new(params[:ramal])
		@ramal = Ramal.find(ramal.id)
		@ramal.update_attributes(params[:ramal])
		respond_to do |format|
      		format.html 
      		format.json { render json: @ramal }
      	end
	end

	def requestramal 
		@ramal = Ramal.find(params[:id])
		respond_to do |format|
      		format.html 
      		format.json { render json: @ramal }
      	end
	end 

	def deleteramal
		@ramal = Ramal.find(params[:id])
		@ramal.destroy

		respond_to do |format|
      		format.json { render json: "true" }
      	end
	end

end
