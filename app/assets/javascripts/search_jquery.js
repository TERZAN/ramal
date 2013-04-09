
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
	//console.log("ok " + $(this).attr('id'));
	//$('#id_div_editmodal').addClass('modal modal-big');
	$("#id_div_editmodal").modal();

});

$("#id_button_submit").click(function() {
	$("#id_button_submit").submit();
});

$('#id_form_ramal_update').submit(function() {
	console.log("Submetendo formulario");
});
