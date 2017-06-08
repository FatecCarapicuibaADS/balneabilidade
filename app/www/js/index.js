var app = {
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    onDeviceReady: function() {
		window.resolveLocalFileSystemURL(cordova.file.dataDirectory + 'dados.json', executarTemplate, downloadFile);
    }
};

app.initialize();

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
	$.getJSON(cordova.file.dataDirectory + 'dados.json',function onFileLoad(lista){
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

function downloadFile(){
	var downloadUrl = "http://fbelisario.com/dataMaps.php";
    var pathFile = cordova.file.dataDirectory + "dados.json";

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
		var fileTransfer = new FileTransfer();
			fileTransfer.download(
			downloadUrl,
			pathFile,
			function (entry) {
				alert("Dados atualizados com sucesso!");
				executarTemplate();
			},
			function (error) {
				alert("Nao foi possivel atualizar os dados! (Code:" + error.code + ")");
			}
		);
	});
}
