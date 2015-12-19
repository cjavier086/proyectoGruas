/*------------------------------------*
	$ DEPENDECIES
*------------------------------------*/
var express 		= require('express'),
		swig 				= require('swig'),
		bodyParser 	= require('body-parser');

var app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*------------------------------------*
	$ CONFIG TEMPLATING
*------------------------------------*/
app.engine('html', swig.renderFile)
app.set('view engine', 'html')
app.set('views', __dirname + '/app/views')

app.use(express.static('./public'))


/*------------------------------------*
	$ START TEST DATA
*------------------------------------*/
// var init = require('./init.js')()


/*------------------------------------*
	$ LOAD ROUTES
*------------------------------------*/
var routes = require('./app/routes/routes')
routes(app)


/*------------------------------------*
	$ INIT APP
*------------------------------------*/
app.listen(process.env.PORT || 4000);
	