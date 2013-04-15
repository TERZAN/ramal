class RamalsController < ApplicationController

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

	def new
		@ramal = Ramal.new 
		respond_to do |format|
			format.html 
			format.json {render json: @ramal}
		end  
	end 

	def save
		@ramal = Ramal.new(params[:ramal])
		size = Ramal.where("number = ?", @ramal.number).size()

		if(size == 0) 
			respond_to do |format|
				if @ramal.save
        			format.json { render json: true}
      			end
      		end
		else
			respond_to do |format|
				format.json { render json: 'ramal_existente' }
			end
		end
	end 



end
