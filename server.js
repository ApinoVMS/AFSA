var fs = require('fs');
var express = require('express');
api     = require('./api');
//     users   = require('./accounts'),
var app     = express();

app.use(express.static('./public'))
    //.use(users)
    .use('/api', api)
    .get('*', function (req, res) {
        console.log("3011");
    //     if (!req.user) { res.redirect('/login'); }  else {  
    	//res.sendFile('public/main.html'); 
        //res.send('Hello You'); 
        res.writeHead(200, {"Content-Type": "text/html"});

  		fs.createReadStream('public/main.html').pipe(res);

        //}
    }).listen(3011);
