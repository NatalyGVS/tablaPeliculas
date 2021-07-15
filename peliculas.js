'use strict'

var http_request = false;

function makeRequest() {

	http_request = false;

	if (window.XMLHttpRequest) { // Mozilla, Safari,...
		http_request = new XMLHttpRequest();
		if (http_request.overrideMimeType) {
			http_request.overrideMimeType('text/xml');
			// Ver nota sobre esta linea al final
		}
	} else if (window.ActiveXObject) { // IE
		try {
			http_request = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
				http_request = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {}
		}
	}

	if (!http_request) {
		alert('Falla :( No es posible crear una instancia XMLHTTP');
		return false;
	}
	http_request.onreadystatechange = llenadoDatos;
	http_request.open('GET', "https://swapi.dev/api/films/", true);

	http_request.send();

}

function llenadoDatos() {

	var table = document.getElementById("tablaPeliculas");
	
	function agregarFila(){
	  }

	if (http_request.readyState == 4) {
		if (http_request.status == 200) {

		var peliculas  = JSON.parse(http_request.responseText).results;
		console.log("peliculas",peliculas);
		
			for ( var i = 0 ; i < peliculas.length; i++){ //cuenta la cantidad de registros
				var nuevafila= "<tr><td>" +
				peliculas[i].title + "</td><td>" +
				peliculas[i].director + "</td><td></tr>";
				$("#tablaPeliculas").append(nuevafila)

			}
		

		} else {
			alert('Hubo problemas con la petición.');
		}
	}

}

makeRequest()

