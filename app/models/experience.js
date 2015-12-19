var mongoose = require('./mongoose')

var experienceSchema = mongoose.Schema({
	titleUrl: String,
	title: String,
	text: String,
	media: {
		images: [String]
		// videos: [String]
	},
	type: Number
})

var Experience = mongoose.model('Experience', experienceSchema)

module.exports = Experience