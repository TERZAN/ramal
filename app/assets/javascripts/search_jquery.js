$('#search_bn').click(function() {
	var url = "/search/search_ramal"
	$.ajax({
		type: "POST",
		url: url, 
		data: {busca: $("#term").val()}
	}).done(function(json) {
		$.build_result(json);
	});
});

$('#search_bn_edit').click(function() {
	var url = "/search/search_ramal"
	$.ajax({
		type: "POST",
		url: url, 
		data: {busca: $("#term").val()}
	}).done(function(json) {
		$.build_result_edit(json);
	});
});

$.build_result = function(json) {
	$('#id_body_result').empty();
	$.each(json, function(index,item) {
		$('#id_body_result').append("<tr>");
		$('#id_body_result').append("<td>#</td>");
		$('#id_body_result').append("<td>" + item.name + "</td>");
		$('#id_body_result').append("<td>" + item.number + "</td>");
		$('#id_body_result').append("<td>" + item.local + "</td>");
		$('#id_body_result').append("</tr>");
	});
};

$.grid_reload = function() {
	var url = "/search/search_ramal"
	$.ajax({
		type: "POST",
		url: url, 
		data: {busca: $("#term").val()}
	}).done(function(json) {
		$.build_result_edit(json);
	});
};

$.build_result_edit = function(json) {
	$('#id_body_edit_result').empty();
	$.each(json, function(index,item) {
		$('#id_body_edit_result').append("<tr id=id_tr_" + item.id  + ">");
		$('#id_body_edit_result').append("<td>#</td>");
		$('#id_body_edit_result').append("<td class='fields' name='field_name'>" + item.name + "</td>");
		$('#id_body_edit_result').append("<td class='fields' name='field_number'>" + item.number + "</td>");
		$('#id_body_edit_result').append("<td class='fields' name='field_local'>" + item.local + "</td>");
		$('#id_body_edit_result').append("<td> <input type='button' class='btn btn-info' id='" + item.id + "' ></input> <input type='button' class='btn btn-danger' id='" + item.id + "' ></input> </td>");
		$('#id_body_edit_result').append("</tr>");
	});
};

$(document).on("click", ".btn-info", function() {
	var url_request = "/ramal/requestramal"
	$.ajax({
        url: url_request, 
        data: {id:$(this).attr("id")},
        dataType: "JSON", 
        type: "GET"
    }).success(function(json){
    	console.log(json);
        $("#id_input_name").val(json.name);
        $("#id_input_local").val(json.local);
        $("#id_input_number").val(json.number);
        $("#id_input_id").val(json.id);
        $("#id_div_editmodal").modal();	
    });
});

$(document).on("click", ".btn-danger", function() {
	var id_ramal = $(this).attr("id");
	$().confirm({title: "Atenção",
		 message: " Deseja remover o ramal selecionado  ?"},
		function() {
			console.log("Confirmou");
			$.remover_ramal(id_ramal);
			$.grid_reload();

	});
});

$.remover_ramal = function(id_ramal) {
	var url_request = "/ramal/deleteramal";	
	$.ajax({
        url: url_request, 
        data: {id: id_ramal},
        dataType: "JSON", 
        type: "DELETE"
    }).success(function(json){
        console.log("ramal removido");
    }).error(function(json) {
    	console.log("erro ao remover");
    });
};

$("#id_button_submit").click(function() {
	var url_update = "/ramal/update";
	//$("#id_form_ramal_update").submit();
	var elements = $("#id_form_ramal_update").serialize();
	$.ajax({
        url: url_update,
        data: elements,
        dataType: "JSON", 
        type: "POST"
    }).success(function(json){
        var id = json.id;
        $.limpar_campos_modal();
        
        $.ajax({
			type: "POST",
			url: "/search/search_ramal", 
			data: {busca: $("#term").val()}
		}).done(function(json) {
			$.build_result_edit(json);
		});

        $("#id_div_editmodal").modal("hide");
    });
});

$.limpar_campos_modal = function() {
	$("#id_input_name").val("");
    $("#id_input_local").val("");
    $("#id_input_number").val("");
    $("#id_input_id").val("");
};



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