//USE BY Heroku

//JSON PACKAGE
//1. scripts
//"heroku-postbuild": "ng build --prod"
//2. At last section
//"engines": {
//    "node": "10.16.0",
//    "npm": "6.14.7"
//  }
//3. type script ver - at dependencies ?
//

//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/heroloWeather'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/heroloWeather/index.html'));

});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);

