
function SliderImage (el, data) {
	
	var mainImage = el.querySelector('.main-image img')
	// console.log('mainImage: ', mainImage)

	var images = el.querySelectorAll('.slider-image img')
	// console.log('images: ', images)

	function setup () {
		for (var i = images.length - 1; i >= 0; i--) {
			images[i].addEventListener('click', function () {
				var imageUrl = this.src
				// console.log('imageUrl: ', imageUrl)
				mainImage.src = imageUrl
			})
		};
	}

	setup()
}

var photoManuals = document.querySelectorAll('.photo-manual')

for (var i = photoManuals.length - 1; i >= 0; i--) {
	new SliderImage(photoManuals[i])
}