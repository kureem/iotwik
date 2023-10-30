


function getDevice(mac){
	var settings = {
  		"url": "iot/get-device?mac=" + mac,
  		"method": "GET"
	};
	$.ajax(settings).done(function(response){
		renderTemplate(response, 'device-details.html', $('.device'))
	});
}


function renderTemplate(device, templateurl, target){
	
	
	$.get(templateurl,function(response){
		const output = Mustache.render(response, device);
		$(target).html(output);	
		renderAction(device,'.actions')
	});
}

function renderAction(device, target){
	$.get('device-action.html',function(response){
		var tmp = '';
		for(var act of device.actions){
			//var tmp = response;
			const output = Mustache.render(response, act);
			tmp = tmp + output;
		}
		debugger;
		$(target).html(tmp);	
		$('.switch-input').each(function(f,e){
			debugger;
			var name = e.name;
			for(var para of device.params){
				if(para.name === name){
					var currentValue = para.currentValue;
					if(currentValue === '1'){
						e.checked =true;
					}
				}
			}
		});
		$('.switch-input').on('change', function(e){
			var name = e.target.name;
		  	var checked = e.target.checked;
		  	addInstruction(device.device.mac,name, checked);
		});
	});
}


  	 
function addInstruction(mac,name, checked){
	var params = {};
	params.actionName ="Switch" + (checked? "On": "Off") + name;
	params.parameterName = name;
	params.parameterValue = checked? "1": "0";
	params.mac = mac;
	 
	data = JSON.stringify(params);

	var xhr = new XMLHttpRequest();
	xhr.withCredentials = true;

	xhr.addEventListener("readystatechange", function() {
	  if(this.readyState === 4) {
	    console.log(this.responseText);
	  }
	});

	xhr.open("POST", "iot/add-instruction");
	xhr.setRequestHeader("Content-Type", "application/json");

	xhr.send(data);
 }
 
 function connect() {
	window.ws = new WebSocket('ws://localhost:8080/ws/acknowledge');
	window.ws.onmessage = function(data){
		showGreeting(data.data);
	}
	 setConnected(true);
}

function getWS(){
	return window.ws;
}
function sendMessage(payload){
	getWS().send(JSON.stringify(payload));
}

function disconnect() {
    if (ws != null) {
        ws.close();
    }
    setConnected(false);
    console.log("Disconnected");
}

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#greetings").html("");
}

function sendName() {
    ws.send($("#name").val());
}

function showGreeting(message) {
    $("#greetings").append(" " + message + "");
}