
$('#search_bn').click(function() {
	//console.log('Respondeu');
	//console.log($("#term").val());
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
	//console.log('Respondeu');
	//console.log($("#term").val());
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
	$.each(json, function(index,item) {
		$('#id_body_edit_result').append("<tr>");
		$('#id_body_edit_result').append("<td>#</td>");
		$('#id_body_edit_result').append("<td>" + item.name + "</td>");
		$('#id_body_edit_result').append("<td>" + item.number + "</td>");
		$('#id_body_edit_result').append("<td>" + item.local + "</td>");
		$('#id_body_edit_result').append("<td> <input type='button' class='btn btn-info' id='" + item.id + "' ></input> </td>");
		$('#id_body_edit_result').append("</tr>");
	});
};

$(document).on("click", ".btn-info", function() {
	var url_request = "/ramal/requestramal"
	$("#id_div_editmodal").modal();	
	$.ajax({
        url: url_request, 
        data: {id:$(this).attr("id")},
        dataType: "JSON", 
        type: "GET"
    }).success(function(json){
    	console.log(json);
        $("#id_input_name").attr("value",json.name);
        $("#id_input_local").attr("value",json.local);
        $("#id_input_number").attr("value",json.number);
        $("#id_input_id").attr("value",json.id);
    });
});

$("#id_button_submit").click(function() {
	var url_update = "/ramal/update";
	//$("#id_form_ramal_update").submit();
	var elements = $("#id_form_ramal_update").serialize();
	console.log(elements);
	$.ajax({
        url: url_update, 
        //data: {name: $("id_input_name").val(), number: $("id_input_number").val(), local: $("id_input_local").val()},
        data: elements,
        dataType: "JSON", 
        type: "POST"
    }).success(function(json){
        console.log("Requisicao enviada com sucesso");
    });
});
