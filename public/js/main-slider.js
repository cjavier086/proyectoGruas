
function Slider (el, data) {

	var slides = el.querySelectorAll('.slide')
	// var sliderNavItems = el.querySelectorAll('.' + data.sliderNavItemClass)

	var pos = 0

	var interval = setInterval(next, 5000)
	
	function setup () {
		
		// move(1)
		
		// for (var i = 0; i < sliderNavItems.length; i++)
		// 	sliderNavItems[i].setAttribute('index', i)

		// for (var i = 0; i < sliderNavItems.length; i++)
		// 	sliderNavItems[i].addEventListener('click', function () {			
		// 		clearInterval(interval)
		// 		interval = setInterval(next, 5000)
		// 		move(parseInt(this.getAttribute('index')))
		// 	})
	}

	function next () {
		if(pos==slides.length-1) move(0)
		else move( pos + 1 )
	}

	function prev () {
		if(pos==0) return
		move( pos - 1 )
	}

	function move (newPos) {
		if(newPos == pos) return
		
		slides[pos].style.zIndex = '0'
		slides[newPos].style.zIndex = '-1'
		
		slides[newPos].style.display = 'block'
		
		slides[pos].classList.add('anim')
		slides[pos].style.opacity = '0'

		setTimeout(function () {
			slides[pos].classList.remove('anim')
			
			slides[pos].style.display = 'none'
			slides[pos].style.opacity = '1'

			pos = newPos
		}, 1500)
	}

	setup()

	return {
		move: move
	}
}

window.slider = new Slider(document.querySelector('.main-slider'))