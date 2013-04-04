// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require twitter/bootstrap
//= require_tree .
//= require jquery-ui



	$('#search_bn').click(function() {
		console.log('Respondeu');
		console.log($("#term").val());

		var url = "/search/search_ramal"
		$.ajax({
			type: "POST",
			url: url, 
			data: {busca: $("#term").val()}
		}).done(function(json) {
			$.build_result(json);
		});
	});

	$.build_result = function(json) {
		console.log("Pesquisa realizada com sucesso " + json);
		$('#id_form_result').empty();
		$.each(json, function(index,item) {
			$('#id_form_result').append("<p>" + item.name + " - " + item.number + "</p>");
		});
	};



