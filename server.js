//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
//Orig app.use(express.static(__dirname + '/dist/<name-of-app>'));
app.use(express.static(__dirname + '/dist/heroloWeather'));

app.get('/*', function(req,res) {
    
//ORIG res.sendFile(path.join(__dirname+'/dist/<name-of-app>/index.html'));

res.sendFile(path.join(__dirname+'/dist/heroloWeather/index.html'));

});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);

