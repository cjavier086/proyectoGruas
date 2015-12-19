var User 	= require('./app/models/user')

var Experience 	= require('./app/models/experience'),
		fs 					= require('fs');

var init = function () {

	/*------------------------------------*
		$ REMOVE ALL TEST EXPERIENCES
	*------------------------------------*/
	Experience.remove({}, function (err) {
		if (err) return console.log(err)
	})

	/*------------------------------------*
		$ LOAD EXPERIENCEDATA.JSON
	*------------------------------------*/
	// fs.readFile('experiencesData.json', 'utf8', function (err, experiencesData) {
	//   if (err) return console.log(err)

	//   var experiences = JSON.parse(experiencesData)

		/*------------------------------------*
			$ ADD TEST EXPERIENCES
		*------------------------------------*/
	// 	for (var i in experiences) {
	// 		experiences[i].titleUrl = experiences[i].title.split(' ').join('-')

	// 		Experience.create(experiences[i], function (err, experience) {
	// 		  if (err) return handleError(err)
	// 		})
	// 	}
	// })

	// var user = {
	// 	username: "admin",
	// 	password: "admin"
	// }

	// User.create(user, function (err, user) {
	//   if (err) return handleError(err)
	// })
}

module.exports = init