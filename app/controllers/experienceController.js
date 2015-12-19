var Experience = require('../models/experience')

var experienceController = function (app) {

	app.get('/experience', function (req, res) {

		Experience.find(function (err, experiences) {
			if (err) res.render('500')

			res.render('experience', {experiences: experiences})
		})
	})

	app.get('/experience/:titleUrl', function (req, res) {

		var titleUrl = req.params.titleUrl

		Experience.findOne({titleUrl: titleUrl}, function (err, experience) {
			if (err) res.render('500')

			if(experience){
				Experience.find(function (err, experiences) {
					if (err) res.render('500')

					experiences = remove(experience, experiences)
					experiences = shuffle(experiences)

					var more = []
					if(experiences.length > 3)
						more = 	[	experiences[0],
											experiences[1],
											experiences[2] ]
					else more = experiences

					res.render('single-experience', {experience: experience, more: more})
				})
			}
			else res.render('404')
		})
	})
}

function remove (el, arr) {
	var ret = []
	for(i = 0; i < arr.length; i++) {
  	if(el.titleUrl != arr[i].titleUrl)
  		ret.push(arr[i])
	}
  return ret
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

module.exports = experienceController