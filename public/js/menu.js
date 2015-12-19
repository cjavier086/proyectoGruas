
var buttonMenu = document.querySelector('.button-menu'),
		mobileMenu = document.querySelector('.mobile-menu'),
		show = false;

buttonMenu.addEventListener('click', function () {
	if(show) mobileMenu.style.display = 'none'
	else mobileMenu.style.display = 'block'
	show = show?false:true
})
