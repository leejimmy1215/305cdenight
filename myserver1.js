var MongoClient = require('mongodb').MongoClient;
var dbUrl = "mongodb://localhost:27017/";

(function() 
 {
	var fs, http, qs, server, url;
	http = require('http');
	url = require('url');
	qs = require('querystring');
	fs = require('fs');
	
	var loginStatus = false, loginUser = "";
	
	server = http.createServer(function(req, res) 
	{
		var action, form, formData, msg, publicPath, urlData, stringMsg;
		urlData = url.parse(req.url, true);
		action = urlData.pathname;
		publicPath = __dirname + "\\public\\";
		console.log(req.url);
		
		if (action === "/Signup") 
		{
			console.log("signup");
			if (req.method === "POST") 
			{
				console.log("action = post");
				formData = '';
				msg = '';
				return req.on('data', function(data) 
				{
					formData += data;
          
					console.log("form data="+ formData);
					return req.on('end', function() 
					{
						var user;
						user = qs.parse(formData);
						user.id = "0";
						msg = JSON.stringify(user);
						stringMsg = JSON.parse(msg);
						var splitMsg = formData.split("&");
						var tempSplitName = splitMsg[1];
						var splitName = tempSplitName.split("=");
						var searchDB = "Name : " + splitName[1];
						console.log("mess="+msg);
						console.log("mess="+formData);
						//console.log("split=" + msg[1]);
						console.log("search=" + searchDB);
						res.writeHead(200, 
						{
							"Content-Type": "application/json",
							"Content-Length": msg.length
						});
						MongoClient.connect(dbUrl, function(err, db) 
						{
							var finalcount;
							if (err) throw err;
							var dbo = db.db("mydb");
							var myobj = stringMsg;
							dbo.collection("customers").count({"Name" : splitName[1]}, function(err, count)
							{
								console.log(err, count);
								finalcount = count;
								if(finalcount > 0)
								{
									if(err) throw err;
									console.log("user exist");
									db.close();
									return res.end("fail");
								}
								else
								{
									dbo.collection("customers").insertOne(myobj, function(err, res) 
									{
										if (err) throw err;
										console.log("1 document inserted");
										db.close();
										//return res.end(msg);
									});
									return res.end(msg);
								}
							});
						});
					});
				});
				
			} 
			else 
			{
				//form = publicPath + "ajaxSignupForm.html";
				form = "login.html";
				return fs.readFile(form, function(err, contents) 
				{
					if (err !== true) 
					{
						res.writeHead(200, 
						{
							"Content-Type": "text/html"
						});
						return res.end(contents);
					} 
					else 
					{
						res.writeHead(500);
						return res.end;
					}
				});
			}
		}
    
    else if (action === "/login")
		{
			console.log("login");
			if (req.method === "POST") 
			{
				console.log("action = post");
				formData = '';
				msg = '';
				return req.on('data', function(data) 
				{
					formData += data;
          
					console.log("form data="+ formData);
					return req.on('end', function() 
					{
						var user;
						user = qs.parse(formData);
						msg = JSON.stringify(user);
						stringMsg = JSON.parse(msg);
						var splitMsg = formData.split("&");
						var tempSplitName = splitMsg[0];
						var splitName = tempSplitName.split("=");
						var tempPassword = splitMsg[1];
						var splitPassword = tempPassword.split("=");
						//var searchDB = "Name : " + splitName[1];
						console.log("mess="+msg);
						console.log("mess="+formData);
						console.log("user=" + splitName[1] + ", password=" + splitPassword[1]);
						//console.log("split=" + msg[1]);
						//console.log("search=" + searchDB);
// 						res.writeHead(200, 
// 						{
// 							"Content-Type": "application/json",
// 							"Content-Length": msg.length
// 						});
						MongoClient.connect(dbUrl, function(err, db) 
						{
							var finalcount;
							if (err) throw err;
							var dbo = db.db("mydb");
							var myobj = stringMsg;
							dbo.collection("customers").count({"uame" : splitName[1], "pwd" : splitPassword[1]}, function(err, count)
							{
								console.log(err, count);
								finalcount = count;
								if(err) throw err;
								if(finalcount > 0)
								{
									loginStatus = true;
									loginUser = splitName[1];
									console.log("user exist, user is: " + loginUser);
									db.close();
									return res.end("success");
								}
								else
								{
									db.close();
									console.log("user or pw not match");
									return res.end("fail");
								}
							});
						});
            
					});
				});
			}
			else 
			{
				//form = publicPath + "ajaxSignupForm.html";
				form = "login.html";
				return fs.readFile(form, function(err, contents) 
				{
					if (err !== true) 
					{
						res.writeHead(200, 
						{
							"Content-Type": "text/html"
						});
						return res.end(contents);
					} 
					else 
					{
						res.writeHead(500);
						return res.end;
					}
				});
			}
		}
    
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		
		if (action === "/register") 
		{
			console.log("register");
			if (req.method === "POST") 
			{
		    console.log("action = post");
				formData = '';
				msg = '';
				return req.on('data', function(data) 
				{
					formData += data;
          
					console.log("form data="+ formData);
					return req.on('end', function() 
					{
						var user;
						user = qs.parse(formData);
						user.id = "0";
						msg = JSON.stringify(user);
						stringMsg = JSON.parse(msg);
						var splitMsg = formData.split("&");
						var tempSplitName = splitMsg[1];
						var splitName = tempSplitName.split("=");
						var searchDB = "Name : " + splitName[1];
						console.log("mess="+msg);
						console.log("mess="+formData);
						//console.log("split=" + msg[1]);
						console.log("search=" + searchDB);
						res.writeHead(200, 
						{
							"Content-Type": "application/json",
							"Content-Length": msg.length
						});
						MongoClient.connect(dbUrl, function(err, db) 
						{
							var finalcount;
							if (err) throw err;
							var dbo = db.db("mydb");
							var myobj = stringMsg;
							dbo.collection("customers").count({"Name" : splitName[1]}, function(err, count)
							{
								console.log(err, count);
								finalcount = count;
								if(finalcount > 0)
								{
									if(err) throw err;
									console.log("user exist");
									db.close();
									return res.end("fail");
								}
								else
								{
									dbo.collection("customers").insertOne(myobj, function(err, res) 
									{
										if (err) throw err;
										console.log("1 document inserted");
										db.close();
										//return res.end(msg);
									});
									return res.end(msg);
								}
							});
						});
					});
				});
				
			} 
			else 
			{

				form = "register.html";
				return fs.readFile(form, function(err, contents) 
				{
					if (err !== true) 
					{
						res.writeHead(200, 
						{
							"Content-Type": "text/html"
						});
						return res.end(contents);
					} 
					else 
					{
						res.writeHead(500);
						return res.end;
					}
				});
			}
		} 

    else if (action === "/login")
		{
			console.log("login");
			if (req.method === "POST") 
			{
				console.log("action = post");
    
				formData = '';
				msg = '';
				return req.on('data', function(data) 
				{
					formData += data;
          
					console.log("form data server="+ formData);
					return req.on('end', function() 
					{
						//var user;
						//user = qs.parse(formData);
						//msg = JSON.stringify(user);
						//stringMsg = JSON.parse(msg);
// 						var splitMsg = formData.split("&");
// 						var tempSplitName = splitMsg[0];
// 						var splitName = tempSplitName.split("=");
// 						var tempPassword = splitMsg[1];
// 						var splitPassword = tempPassword.split("=");
					
//             console.log(tempSplitName);
						//res.writeHead(200, 
					//	{
					//		"Content-Type": "application/json",
					//		"Content-Length": msg.length
					//	});
				   // return res.end("hi iam logins");
        
            
            // 1. connect mongo db
            MongoClient.connect(dbUrl, function(err, db) {
              var dbo = db.db("mydb");
            if (err) {
              console.log("Connection failed")
            }
              
           
       
            dbo.collection("student").insertOne({ "name": "ALEX NG", "age": "18" }, function(err, result) {
            if (err) {
                console.log(err);
            }
    
            })


            dbo.collection("student").insertMany([{ "name": "Peter Pan", "age": "18" }, { "name": "Iron Man" }], function(err, result) {
            if (err) {
                console.log(err);
            }
            console.log(result);
            })

             
             
              
              
   
                dbo.collection("student").find({}).toArray(function(err, result) {
                if (err) throw err;
                  console.log(result);
            
                });
             ////monogodb delete record 
            //  dbo.collection("student").remove({'age':'18'},function(err, result) {
             //   if (err) throw err;
              //    console.log(result);
            
           //     });
    
             
              
               db.close();
            })
            
            
            dbo.collection("student").find(stringMsg).toArray(function(err, result) {
                      console.log(result);

                      if (err) throw err;
                      
                      if (result.length > 0){
                        return res.end("login success");
                      }else{
                        return res.end("login fail");
                      }
                      
                      db.close();
                      
                    });
            
        ////////////end connect mongo db    
            
            return res.end("Connection succeed");
            
            
					});
				});
        
       
			}
			else 
			{
				//form = publicPath + "ajaxSignupForm.html";
				form = "login.html";
				return fs.readFile(form, function(err, contents) 
				{
					if (err !== true) 
					{
						res.writeHead(200, 
						{
							"Content-Type": "text/html"
						});
						return res.end(contents);
					} 
					else 
					{
						res.writeHead(500);
						return res.end;
					}
				});
			}
      
      
       
		}
	
		else if (action === "/addfavourlist")
		{
      
			if(!loginStatus)
			{
				console.log("no logged in user found");
			}
			else
			{
				
        
          console.log("action = post");
          formData = '';
          msg = '';
          return req.on('data', function(data) 
          {
            
            formData += data;

            console.log("form data="+ formData);
            return req.on('end', function() 
            {
              var fav;
              
              formData += "&username="+loginUser;
              fav = qs.parse(formData);
                                         
              msg = JSON.stringify(fav);
              stringMsg = JSON.parse(msg);              
              
              var splitMsg = formData.split("&");
              var tempSplitName = splitMsg[0];
              var splitName = tempSplitName.split("=");
              var searchDB = "texttitle : " + splitName[0];
              
              //console.log("mess="+msg);
              //console.log("mess="+formData);
              //console.log("split=" + msg[1]);
              //console.log("search=" + searchDB);
              
              res.writeHead(200, 
              {
                "Content-Type": "application/json",
                "Content-Length": msg.length
              });
              MongoClient.connect(dbUrl, function(err, db) 
              {
                var finalcount;
                if (err) throw err;
                var dbo = db.db("mydb");
                var myobj = stringMsg;
                dbo.collection("favourlist").count({"texttitle" : splitName[0]}, function(err, count)
                {
                  console.log(err, count);
                  finalcount = count;
                  if(finalcount > 0)
                  {
                    if(err) throw err;
                    db.close();
                    return res.end("fail");
                  }
                  else
                  {
                    dbo.collection("favourlist").insertOne(myobj, function(err, favres) 
                    {
                      if (err) throw err;
                      console.log("1 document inserted");
                      db.close();
                    });
                    return res.end("success");
                  }
                });
                
              });
            });
          });
        
        
			}
		}
	
    else if (action === "/delfavourlist")
		{
      
			if(!loginStatus)
			{
				console.log("no logged in user found");
			}
			else
			{
				
          console.log("action = post" + " delete list");
          formData = '';
          msg = '';
          return req.on('data', function(data) 
          {
            
            formData += data;

            console.log("form data="+ formData);
            return req.on('end', function() 
            {
              var fav;
              
              formData += "&username="+loginUser;
              fav = qs.parse(formData);
                                         
              msg = JSON.stringify(fav);
              stringMsg = JSON.parse(msg);              
              
              var splitMsg = formData.split("&");
              var tempSplitName = splitMsg[0];
              var splitName = tempSplitName.split("=");
              var searchDB = "texttitle : " + splitName[0];
              
              //console.log("mess="+msg);
              //console.log("mess="+formData);
              //console.log("split=" + msg[1]);
              //console.log("search=" + searchDB);
              
              res.writeHead(200, 
              {
                "Content-Type": "application/json",
                "Content-Length": msg.length
              });
              MongoClient.connect(dbUrl, function(err, db) 
              {
                var finalcount;
                if (err) throw err;
                var dbo = db.db("mydb");
                var myobj = stringMsg;
                dbo.collection("favourlist").remove({"_id" : ObjectId( + "\"" + splitName[0] + "\"" )}, function(err, count)
                {
    				if (err) throw err;
    				console.log("result" + result);
    				db.close();
						var resultReturn = JSON.stringify(result);
						console.log("resultReturn" + resultReturn);
            return res.end(resultReturn);
					});
                
              });
            });
          });
        
        
			}
		}
		else if (action === "/readfavourlist")
		{
			if(!loginStatus)
			{
				console.log("no logged in user found");
			}
			else
			{
				console.log("read favour");
				MongoClient.connect(dbUrl, function(err, db) 
				{
					var finalcount;
					if (err) throw err;
					var dbo = db.db("mydb");
					var myobj = stringMsg;
					dbo.collection("favourlist").find({"username" : loginUser}).toArray(function(err, result) 
					{
    				if (err) throw err;
    				console.log("result" + result);
    				db.close();
						var resultReturn = JSON.stringify(result);
						console.log("resultReturn" + resultReturn);
            return res.end(resultReturn);
					});
				});
			}
		}
    
    
    else if (action === "/search")
		{
			if(!loginStatus)
			{
				sendFileContent(res, "login.html", "text/html");
			}
			else
			{
				sendFileContent(res, "search.html", "text/html");
			}
		}

		else 
		{
      //handle redirect
			if(req.url === "/index")
			{
//         if(loginStatus)
// 				{
// 					sendFileContent(res, "login.html", "text/html");
// 				}
// 				else
// 				{
// 					sendFileContent(res, "index.html", "text/html");
// 				}
          sendFileContent(res, "index.html", "text/html");
			}
			else if (req.url === "/Signuppage")
			{
				sendFileContent(res, "signuppage.html", "text/html");
			}
			else if (req.url === "/loginpage")
			{
				sendFileContent(res, "loginpage.html", "text/html");
			}

			else if(req.url === "/")
			{
				console.log("Requested URL is url" + req.url);
				res.writeHead(200, 
				{
					'Content-Type': 'text/html'
				});
				res.write('<b>Hey there!</b><br /><br />This is the default response. Requested URL is: ' + req.url);
			}
			else if(/^\/[a-zA-Z0-9-._\/]*.js$/.test(req.url.toString()))
			{
				sendFileContent(res, req.url.toString().substring(1), "text/javascript");
			}
			else if(/^\/[a-zA-Z0-9-._\/]*.css$/.test(req.url.toString()))
			{
				sendFileContent(res, req.url.toString().substring(1), "text/css");
			}
			else if(/^\/[a-zA-Z0-9-._\/]*.jpg$/.test(req.url.toString()))
			{
				sendFileContent(res, req.url.toString().substring(1), "image/jpg");
			}
			else
			{
				console.log("Requested URL is: " + req.url);
				res.end();
			}

		}
	});

	server.listen(9000);

	console.log("Server is running，time is" + new Date());


	function sendFileContent(response, fileName, contentType)
	{
		fs.readFile(fileName, function(err, data)
		{
			if(err)
			{
				response.writeHead(404);
				response.write("Not Found!");
			}
			else
			{
				response.writeHead(200, {'Content-Type': contentType});
				response.write(data);
			}
			response.end();
		});
	}
 }).call(this);
