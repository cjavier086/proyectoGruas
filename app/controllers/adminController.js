var Experience = require('../models/experience'),
		User = require('../models/user');

var session = require('express-session'),
		passport = require('passport'),
		LocalStrategy = require('passport-local').Strategy;


var adminController = function (app) {

	// app.use(require('morgan')('combined'));
	app.use(require('cookie-parser')())
	app.use(session({
		secret: 'gruaseizajes',
		resave: false,
		saveUninitialized: false
	}))

	app.use(passport.initialize())
	app.use(passport.session())

	passport.use(new LocalStrategy(
		function (username, password, done) {
			User.findOne({username: username}, function (err, user) {
				if (err) return done(err)
				if (!user) return done(null, false)
				if (user.password != password) return done(null, false)
				return done(null, user)
			})
		}
	))

	passport.serializeUser(function(user, done) {
		done(null, user.id);
	})

	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user)
		})
	})

	function isAuthenticated (req, res, next) {
		if(req.isAuthenticated()) return next()
		res.redirect('/admin')
	}

	app.post('/login',
		passport.authenticate('local', { failureRedirect: '/admin' }),
		function(req, res) {
			res.redirect('/admin/experiences/');
		});

	app.get('/logout',
		function(req, res){
			req.logout();
			res.redirect('/');
		});


	/*------------------------------------*
		$ URLS
	*------------------------------------*/
	app.get('/admin/', function (req, res) {
		res.render('admin')
	})

	app.get('/admin/experiences/', isAuthenticated, function (req, res) {

		Experience.find(function (err, experiences) {
			if (err) res.render('500')

			res.render('admin-experiences', {experiences: experiences})
		})
	})

	app.get('/admin/experience/:titleUrl', isAuthenticated, function (req, res) {

		var titleUrl = req.params.titleUrl

		Experience.findOne({titleUrl: titleUrl}, function (err, experience) {
			if (err) res.render('500')

			if(experience) res.render('admin-experience', {experience: experience})
			else res.render('404')
		})
	})

	app.get('/admin/add', isAuthenticated, function (req, res) {
		res.render('admin-add')
	})


	/*------------------------------------*
		$ EXPERIENCE API
	*------------------------------------*/
	app.get('/api/admin/experience/create/', function (req, res) {
		var experience = req.query

		experience.titleUrl = experience.title.split(' ').join('-')
		console.log('experience', experience)

		Experience.find({titleUrl: experience.titleUrl},function (err, experiences) {
			if (err) res.send({status: 500})

			// Titulo ya existe
			if(experiences.length){
				console.log('Titulo ya existe!')
				return res.send({status: 400})
			}

			// Nuevo titulo valido
			Experience.create(experience, function (err, experience) {
				if (err) res.send({status: 500})

				console.log('experiencia agregada!')
				res.send({status: 200, newUrl: experience.titleUrl})
			})
		})

	 })

	app.get('/api/admin/experience/update/:titleUrl', function (req, res) {

		var titleUrl = req.params.titleUrl

		var newExperience = req.query
		newExperience.titleUrl = newExperience.title.split(' ').join('-')

		if (titleUrl == newExperience.titleUrl) {
			// No se actualizo el titulo
			console.log('no se actualizo el titulo!')

			Experience.findOneAndUpdate({titleUrl: titleUrl}, newExperience,function (err, experience) {
				if (err) res.send({status: 500})

				console.log('experiencia actualizada!')
				res.send({status: 200, newUrl: newExperience.titleUrl})
			})

		} else {
			// Cambio el titulo
			console.log('cambio el titulo!')

			Experience.find({titleUrl: newExperience.titleUrl},function (err, experiences) {
				if (err) res.send({status: 500})

				// Nuevo titulo ya existe
				if(experiences.length){
					console.log('nuevo titulo ya existe!')
					return res.send({status: 400})
				}

				// Nuevo titulo valido
				Experience.findOneAndUpdate({titleUrl: titleUrl}, newExperience,function (err, experience) {
					if (err) res.send({status: 500})

					console.log('experiencia actualizada!')
					res.send({status: 200, newUrl: newExperience.titleUrl})
				})
			})

		}

	})

	app.get('/api/admin/experience/delete/:titleUrl', function (req, res) {

		var titleUrl = req.params.titleUrl

		Experience.remove({ titleUrl: titleUrl }, function (err) {
			if (err) res.send({status: 500})

			res.send({status: 200})
		})
	})
}

module.exports = adminController