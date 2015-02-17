/*jslint node: true*/
"use strict";

var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs"),
    contentTypesByExtension = {'.html': "text/html", '.css':  "text/css", '.js':   "text/javascript" };


http.createServer(function (request, response) {
    if ((request.url === "/apple-touch-icon-precomposed.png") || (request.url === "/apple-touch-icon.png")) {
        response.writeHead(400, "text/plain");
        response.end();
        
        return;
    }
    
    
    console.log("request for " + request.url);
    
    var uri = url.parse(request.url).pathname,
        filename = "." + uri,
        contentType = contentTypesByExtension[path.extname(filename)];
    
    if (fs.statSync(filename).isDirectory()) {
        filename += "/index.html";
    }

    console.log("serving with: " + filename);
    
    fs.readFile(filename, "binary", function (err, file) {
        if (err) {
            response.writeHead(500, {"Content-Type": "text/plain"});
            response.write(err + "\n");
        } else {
            response.writeHead(200, contentType);
            response.write(file, "binary");
        }
        
        response.end();
    });
}).listen(80);

console.log("CTRL + C to shutdown");