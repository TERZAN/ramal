(function($) {
	$.fn.alert_message = function(data) {
	var defaultData = {};
	if (data){$.extend(defaultData, data);}
	var alert = $("<div>").addClass("alert");
	if(data.type){
		$(alert.addClass("alert-" + defaultData.type));
	}
	$(alert).html(defaultData.message);
	if(data.title){
		$(alert).prepend($("<h4>").addClass("alert-heading").text(defaultData.title));
	}
	$(alert).prepend($("<a>").addClass("close").attr("data-dismiss", "alert").text("×"));
	$(this).prepend(alert);
	return alert;
};
})(jQuery);


(function($){
	$.fn.confirm = function(data, callback, fallback) {
		var primaryEvent = false;
		var defaultData = {title: "Título",
						   message: "Mensagem",
						   primary: "Sim",
						   secundary: "Não",
						   onHideShow: false};
		if (data){$.extend(defaultData, data);}
		var confirm = $("<div>").addClass("modal");
		$(confirm).append($("<div>").addClass("modal-header"));
		$(confirm).children(".modal-header").append($("<a>").addClass("close")
		        		  	 	 						    .attr("data-dismiss", "modal")
		        		  	 	 						    .text("×"));
		if(defaultData.title){
			$(confirm).children(".modal-header").append($("<h3>")
												.text(defaultData.title));
		}
		$(confirm).append($("<div>").addClass("modal-body")
								    .html(defaultData.message));
		
		$(confirm).append($("<div>").addClass("modal-footer"));
		$(confirm).on("hide", function() {
			if(fallback && !primaryEvent){
				fallback();
			}
			if(defaultData.onHideShow){
				$(defaultData.onHideShow).modal("show");
			}
			$(this).remove();
		});
		if(defaultData.primary){
			$(confirm).children(".modal-footer").prepend($("<a>").attr("id", "btn-primary")
					 											 .addClass("btn")
															     .addClass("btn-primary")
															     .text(defaultData.primary)
															     .attr("data-dismiss", "modal")
															     .click(callback)
															     .click(function(){ primaryEvent = true;}));
		}
		if(defaultData.secundary){
			$(confirm).children(".modal-footer").prepend($("<a>").attr("id", "btn-secundary")
																 .addClass("btn")
																 .attr("data-dismiss", "modal")
					   										     .text(defaultData.secundary));
		}		
		$("body").append(confirm);
		$(confirm).modal('show');		
		return confirm;
	};
})(jQuery);