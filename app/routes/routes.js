var experienceController 	= require('../controllers/experienceController')
var adminController 			= require('../controllers/adminController')
var mailingController 			= require('../controllers/mailingController')

var routes = function (app) {

	/*------------------------------------*
		$ INDEX
	*------------------------------------*/
	app.get('/', function (req, res) {
		res.render('index')
	})


	/*------------------------------------*
		$ ABOUT
	*------------------------------------*/
	app.get('/about', function (req, res) {
		res.render('about')
	})


	/*------------------------------------*
		$ EXPERIENCE
	*------------------------------------*/
	experienceController(app)


	/*------------------------------------*
		$ EQUIPMENT
	*------------------------------------*/
	app.get('/equipment', function (req, res) {
		res.render('equipment')
	})


	/*------------------------------------*
		$ CONTACT
	*------------------------------------*/
	app.get('/contact', function (req, res) {
		res.render('contact')
	})


	/*------------------------------------*
		$ WORK
	*------------------------------------*/
	app.get('/work', function (req, res) {
		res.render('work')
	})


	/*------------------------------------*
		$ ADMIN
	*------------------------------------*/
	adminController(app)


	/*------------------------------------*
		$ MAILING
	*------------------------------------*/
	mailingController(app)

}

module.exports = routes