var intervalId = null;

function post(){
	postMessage(true);	
}

onmessage = function(e){	
	if(e.data === "start") {				
		intervalId = setInterval(post, 6000);		
	}else if(e.data === "stop") {
		clearInterval(intervalId);
	}	
}