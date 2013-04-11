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
	var url_request = "/ramal/deleteramal"
	$.ajax({
        url: url_request, 
        data: {id:$(this).attr("id")},
        dataType: "JSON", 
        type: "DELETE"
    }).success(function(json){
    	console.log(json);
        $("#id_div_editmodal").modal();	
    });
}

$("#id_button_submit").click(function() {
	var url_update = "/ramal/update";
	//$("#id_form_ramal_update").submit();
	var elements = $("#id_form_ramal_update").serialize();
	console.log(elements);
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