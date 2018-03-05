var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');//required

var port = process.env.PORT || 3000;
 app.listen(3000);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());//wajib

app.get('/',(req,res,next)=>{
	res.sendFile(__dirname + '/index.html');
});

app.post('/',(req,res,next)=>{


req.checkBody('username','username field cannot be empty.').notEmpty();
req.checkBody('username','Username must be between 4-15 characters long.').len(4,15);
req.checkBody('email','The email you entered is invalid, please try again.').isEmail();
req.checkBody('email','Email address must be between 4-100 characters long, please try again.').len(4,100);
req.checkBody('password','Password must be between 8-100 characters long.').len(8,10);
req.checkBody('password','password must include one lowercase character, one uppercase character, a number, and a special character.').matches(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])/);
req.checkBody('passwordMatch','password must be between 8-100 characters long.').len(8,10);
req.checkBody('passwordMatch','password do not match, please try again.').equals(req.body.password);

var errors = req.validationErrors();

	if(errors){
		console.log(`errors: ${JSON.stringify(errors)}`)
		

	}
	res.send(JSON.stringify(errors));
});

module.exports = app;