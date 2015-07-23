// install all required modules via npm install
var express = require('express');
var faker = require('faker');
var cors = require('cors');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var request = require('request-sync');
//jwt should be stored in another location
var jwtSecret = 'sdfkjsaléfkjaslkfjlkasfjaskléfj/skdfjkl';
var domain = 'http://localhost:3000/';
var user;
var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(expressJwt({ secret: jwtSecret }).unless({ path: ['/login'] }));

app.post('/login', authenticate, function(req, res){
    
    var token = jwt.sign({
       id : user.id,
       username: user.userName
    }, jwtSecret);
     res.json({
        token:token,
        user: user
    });
});



app.listen(3300, function(){
    console.log('app listening on localhost:3300');
});

//Util functions
function authenticate(req, res, next){
    var my_user = JSON.parse(request(domain+"users?userName="+req.body.username).body);
      
    user = my_user[0];
    
    var body = req.body;
    if (!body.username || !body.password){
        res.status(400).end('Must provide a username or a password');
    }
    if(body.username !== user.userName || body.password !== user.password){
        res.status(401).end('Username or password are incorrect')
    }
    next();
}
