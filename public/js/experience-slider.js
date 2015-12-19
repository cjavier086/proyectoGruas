function ExperienceSlider (el, data) {

	var slides = el.querySelectorAll('img'),
			buttonNext = el.querySelector('.fa-chevron-left'),
			buttonPrev = el.querySelector('.fa-chevron-right'),
			pos = 0;

	console.log('slides: ', slides)
	console.log('buttonNext: ', buttonNext)
	console.log('buttonPrev: ', buttonPrev)

	function setup () {
		buttonNext.addEventListener('click', prev)
		buttonPrev.addEventListener('click', next)
	}

	function next () {
		console.log('next')
		if(pos == slides.length-1) return
		goTo(pos+1)
	}

	function prev () {
		console.log('prev')
		if(pos == 0) return
		goTo(pos-1)
	}

	function goTo (newPos) {

		for (var i = 0; i < slides.length; i++) {
			var style = slides[i].style
			style.webkitTransform = 'translate(' + newPos * -100 + '%,0)' + 'translateZ(0)'
			style.msTransform =
			style.MozTransform =
			style.OTransform = 'translateX(' + newPos * -100 + '%)'
		}

		pos = newPos
	}

	setup()

	return {
		goTo: goTo
	}
}

window.experienceSlider = new ExperienceSlider(document.querySelector('.slider-image'))