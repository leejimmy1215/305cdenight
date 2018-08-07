var http = require('http');
var fs = require("fs");
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var url = require('url');

http.createServer(function(request, response) {
//   var urlData;
//     urlData = url.parse(req.url, true);
// 		action = urlData.pathname;
	if(request.url === "/index"){
		sendFileContent(response, "index.html", "text/html");
    
    if(request.method === "POST"){
      
    }
    
    
	}else if(request.url === "/login"){
    console.log("login");
            
    sendFileContent(response, "login.html", "text/html");
    
    if(request.method === "POST"){
      console.log("post data");
    }
    
  }else if(request.url === "/register"){
    console.log("login");
            
    sendFileContent(response, "register.html", "text/html");
    
    if(request.method === "POST"){
      console.log("post data");
    }
  }
  
	else if(request.url === "/"){
		console.log("Requested URL is url" +request.url);
		response.writeHead(200, {'Content-Type': 'text/html'});
		response.write('<b>Hey there!</b><br /><br />This is the default response. Requested URL is: ' + request.url);
	}else if(request.url === "/auto"){
		console.log("Requested URL is url" +request.url);
		sendFileContent(response, "client.html", "text/html");
              if (response.method === "POST") {
                 return res.end("hi alex");
	             }
  }
  
	else if(/^\/[a-zA-Z0-9-._\/]*.js$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/javascript");
	}
	else if(/^\/[a-zA-Z0-9-._\/]*.css$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/css");
	}else if(/^\/[a-zA-Z0-9-._\/]*.jpg$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "image/jpg");
  }else if(/^\/[a-zA-Z0-9-._\/]*.png$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "image/png");
	}
  
	else{
		console.log("Requested URL is: " + request.url);
		response.end();
	}
}).listen(8080)

function sendFileContent(response, fileName, contentType){
	fs.readFile(fileName, function(err, data){
		if(err){
			response.writeHead(404);
			response.write("Not Found!");
		}
		else{
			response.writeHead(200, {'Content-Type': contentType});
			response.write(data);
		}
		response.end();
	});
}