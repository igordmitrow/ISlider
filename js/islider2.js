class iSlider {
	constructor(wrapper='IWrapper',initialSlide=0, direction=0, changeMode=0, arrowLocation=0) {
		this.arrowLocation = arrowLocation; // Arrow Location (inside Wrapper or outside)
		this.domWrapper = document.querySelector(`.${wrapper}`); // Get Wrapper
		this.current = initialSlide; // Slide that will be at the beginning
		this.isMouseDown = false; // Is user press left button on mouse 
    	this.direction = direction; // Horizontal or Vertical Slider
    	this.changeMode = 0; // Different mode of slide change
		this.arrows = []; // Array with all navigation arrow
		this.indicators = []; // Slider indicators
		this.slides = []; // Array with all slide
		this.wrapper = wrapper; // Slide Wrapper
		this.dx = 0; // Delta x of swipe
		this.initSlider().then(this.initWrapperEvent()).then(this.setCurrent());
  	}
  	//Initialize slider
  	async initSlider() {
  		document.querySelectorAll(`.${this.wrapper} *`).forEach( function (e){
  			if(e.classList.contains('slide')) this.slides.push(e);
  			else if (e.classList.contains('arrow')){
  				this.arrows.push(e);
  				e.addEventListener('click',function (event) {
  					this.chgSlide(event.target == this.arrows[0] ? -1 : 1);
  				}.bind(this));}
  			else if (e.classList.contains('indicator')) {
  				this.indicators.push(e);
  				e.addEventListener('click', function (event) {
  					this.slides.forEach(function (e) {
  						if(e.classList.contains('Slider__Animation')) e.classList.remove('Slider__Animation');
  					});
  					this.chgSlide(this.indicators.indexOf(event.target)-this.current);
  				}.bind(this));}
  		}.bind(this));
  	}
  	// Set diffent EventListener for Wrapper
  	async initWrapperEvent() {
  		this.domWrapper.addEventListener('mousemove', function (e) {
  			this.dx += this.isMouseDown ? this.direction == 1 ? e.movementY : e.movementX : 0;
  		}.bind(this));

  		this.domWrapper.addEventListener('mousedown', function () {
  			this.dx = 0;
  			this.isMouseDown = 1;
  		}.bind(this));

  		this.domWrapper.addEventListener('mouseup', function () {
  			this.isMouseDown = 0;
  			if(Math.abs(this.dx) > 100) this.chgSlide(this.dx > 0 ? -1 : 1);
  		}.bind(this));

  		this.domWrapper.addEventListener('touchstart', function(e) {
  			this.dx = this.direction == 1 ? e.touches[0].clientY : e.touches[0].clientX;
		}.bind(this));

		this.domWrapper.addEventListener('touchend', function(e) {
  			this.dx -= this.direction == 1 ? e.changedTouches[0].clientY : e.changedTouches[0].clientX;
			if(Math.abs(this.dx) > 100) this.chgSlide(this.dx > 0 ? -1 : 1);			
		}.bind(this));
  	}
  	async chgSlide(dir) {
  		this.slides[this.current].classList.remove('active-slide');
  		this.slides[this.next].classList.remove('next-slide');
  		this.indicators[this.current].classList.remove('active-indicator');
  		setTimeout(function () {
  			this.classList.remove('Slider__Animation');
  		}.bind(this.slides[this.current]), 500);
  		this.current = this.current + dir >= 0 ? this.current + dir < this.slides.length ? this.current + dir : 0 : this.slides.length - 1;
  		this.setCurrent(dir);
  	}
  	async setCurrent(dir){
  		this.slides[this.current].classList.add('active-slide');
  		this.indicators[this.current].classList.add('active-indicator');
  		this.next = (this.current + 1 < this.slides.length) ? this.current + 1 : 0;
  		this.slides[this.next].classList.add('next-slide');
  		if(Math.abs(dir) == 1) this.slides[this.current].classList.add('Slider__Animation');
  	}
} 