/*jslint node: true*/
"use strict";

var http = require("http"),
    fsm = require("state_lite.js"),
    headers = { '.html': { ct: "text/html", cc: "no-cache" },
                '.css': { ct: "text/css", cc: "public, max-age=604800" },
                '.js': { ct: "text/javascript", cc: "public, max-age=86400" },
                '.xml': { ct: "application/xml", cc: "no-cache" },
                '.txt': { ct: "text", cc: "no-cache" },
                '.pdf': { ct: "application/pdf", cc: "public, max-age=86400" },
                '.ico': { ct: "image/x-icon", cc: "public, max-age=604800" },
                '.png': { ct: "image/png", cc: "public, max-age=604800" } },
    index = { '/': "/index.html" },
    cache = {},
    timestamp;

function loadCache(directory, fs, path) {
    var i, files = fs.readdirSync(directory), len = files.length, file, url, data, stats;
    
    for (i = 0; i < len; i = i + 1) {
        if (files[i][0] !== "." && files[i] !== "CNAME") {
            file = directory + "/" + files[i];
            url = file.slice(1);
            stats = fs.statSync(file);
            
            if (stats.isDirectory()) {
		if (files[i] !== "node_modules") {
                    loadCache(file, fs, path);
		}
            } else {
                console.warn("Caching: " + url);

		var machine = new fsm.State("content");
            
                cache[url] = { data: fs.readFileSync(file, "binary"), headers: { 'Content-Type': headers[path.extname(file)].ct, 'Cache-Control': headers[path.extname(file)].cc, 'Last-Modified': stats.mtime } };
                index[url] = url;
    
                if (files[i] === "index.html") {
                    index[directory.slice(1)] = url;
                    index[directory.slice(1) + "/"] = url;
                }
            }
        }
    }
}

loadCache(".", require("fs"), require("path"));

http.createServer(function (request, response) {
    if (request.method === "GET" || request.method === "HEAD") {
        var page = cache[index[request.url]];
        
        if (page) {
            response.writeHead(200, page.headers);
            if (request.method === "GET") {
                response.write(page.data, "binary");
            }
        } else {
            response.writeHead(404, { "Content-Type": "text/plain" });
            if (request.method === "GET") {
                response.write("404 Not Found\n");
            }
        }

    } else {
        response.writeHead(405, { "Content-Type": "text/plain" });
        if (request.method === "GET") {
            response.write("405 Method Not Allowed\n");
        }
    }
    
    response.end();
    
    timestamp = new Date();
    console.log(timestamp.toString() + " " + request.connection.remoteAddress + " " + request.method + ": " + request.url);
}).listen(80);
