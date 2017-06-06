/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        console.log('Received Event: ' + id);
    }
};

app.initialize();

$(document).on("pagecontainershow", function (e, ui) {	
	 executarTemplate();	 
});

function exitFromApp(){
	if (navigator.app) {
		navigator.app.exitApp();
	} else if (navigator.device) {
		navigator.device.exitApp();
	} else {
		window.close();
	}
}
			
function executarTemplate(){
	//$.getJSON('http://fbelisario.com/dataMaps.php',function onFileLoad(lista){
	$.getJSON('data/dados.json',function onFileLoad(lista){
		console.log(lista);
		var container = {lista:[]};
		$.each(lista, function( index, value ) {
			localStorage.setItem(value.praia, value.local); 
			value.class = "imp";
			if(value.qualidade == 'Propria')
				value.class = 'pro';
		});
		container.lista = lista
		var template = $('#template').html();
		var novoHtml = Mustache.to_html(template, container);
		console.log(container);
		$('#lstview').html(novoHtml);
		$('#lstview').listview("refresh");
	});
}