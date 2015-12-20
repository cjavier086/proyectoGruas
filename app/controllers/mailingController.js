
var multer  = require('multer');
var express = require('express');

var mongoose = require('../models/mongoose');

var upload = multer({ dest: 'uploads/' }).single('cv');


var mailingController = function (app) {

	app.get('/api/mailing/contact', function (req, res) {

		var contact = req.query;

		var nodemailer = require('nodemailer');
		var mg = require('nodemailer-mailgun-transport');

		var auth = {
			auth: {
				api_key: 'key-437a2a27c963c3e46817e85fb380c134',
				domain: 'appbf314a2637244d329adf272e1f893eda.mailgun.org'
			}
		};

		var transport = nodemailer.createTransport(mg(auth));

		transport.sendMail({

			from: contact.email,
			// to: 'hansevangelista@gmail.com',
			to: 'David.Yabar@gruaseizajes.pe',
			subject: 'Cotizacion de ' + contact.business,
			text: contact.text + "\n\n- solicitante: " + contact.applicant + "\n- empresa: " + contact.business + "\n- telefono: " + contact.phone

		}, function (err, responseStatus) {

			if(!err) return res.send({status: 200});
			else return res.send({status: 400})
		})

	});


	app.post('/api/mailing/work', function (req, res) {

	  upload(req, res, function (err) {
	    if (err) {
	    	// return res.send({status: 400})
	    	return res.redirect('/work')
	    }

			var work = req.body;
			var file = req.file;

			var nodemailer = require('nodemailer');
			var mg = require('nodemailer-mailgun-transport');
			

			var auth = {
				auth: {
					api_key: 'key-437a2a27c963c3e46817e85fb380c134',
					domain: 'appbf314a2637244d329adf272e1f893eda.mailgun.org'
				}
			};

			var transport = nodemailer.createTransport(mg(auth));

			transport.sendMail({

				from: work.email,
				// to: 'hansevangelista@gmail.com',
				to: 'David.Yabar@gruaseizajes.pe',
				subject: 'Solicitud tarbajo de ' + work.name,
				text: "\n- solicitante: " + work.name + "\n- puesto: " + work.position,
				attachments : [
					{
						filename: 'cv - ' + work.name + '.pdf',
						path: process.env.PWD + '/uploads/' + file.filename
					}
				]

			}, function (err, responseStatus) {

				// if(!err) return res.send({status: 200})
				// else return res.send({status: 400})
				if(!err) return res.redirect('/work');
				else return res.redirect('/work');
			})

	  })

	});

	app.post('/api/mailing/')

};

module.exports = mailingController;