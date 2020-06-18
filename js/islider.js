
class iSlider {
	constructor(w='IWrapper',c=0, d=0) {
		this.slides = [];
		this.current = c;
		this.arrows = [];
		this.indicators = [];
		this.wrapper = w;
		this.domWrapper = document.querySelector(`.${this.wrapper}`);
    	this.direction = d;
		this.isMouseDown = 0;
		this.dx = 0;
		this.initSlider().then(this.initArrows()).then(this.setCurrent()).then(this.initType());
  	}

  	async delCurrent() {
  		this.slides[this.current].classList.remove('active-slide');
  		this.slides[this.next].classList.remove('next-slide');
  		this.indicators[this.current].classList.remove('active-indicator');
  		// this.slides[this.prev].classList.remove('prev-slide');
  		setTimeout(function () {
  			this.classList.remove('Slider__Animation');
  		}.bind(this.slides[this.current]), 500);

      if(document.querySelectorAll(`.${this.wrapper} .Slider__Animation`).length > 1) {
        document.querySelectorAll(`.${this.wrapper} .Slider__Animation`).forEach(function (e,index) {
          console.log(e);
          e.classList.remove('Slider__Animation');
        });
      }
  	}

  	async setCurrent(dir=0) {
  		this.slides[this.current].classList.add('active-slide');
  		this.indicators[this.current].classList.add('active-indicator');
  		if(Math.abs(dir) == 1){
  			this.slides[this.current].classList.add('Slider__Animation');
  		}
  		this.next = (this.current + 1 < this.slides.length) ? this.current + 1 : 0;
  		// this.prev = (this.current - 1 >= 0) ? this.current - 1 : this.slides.length - 1;
  		this.slides[this.next].classList.add('next-slide');
  		// this.slides[this.prev].classList.add('prev-slide');

  	}

  	async callChgSlide() {
  		if(this.dx <= -1) {
  			this.changeSlide(1);
  		} else if (this.dx >= 1) {
  			this.changeSlide(-1);
  		}
  		this.dx = 0;
  	}

  	async changeSlide(dir) {
  		this.delCurrent();
  		if(this.current + dir >= 0) {
  			if (this.current + dir < this.slides.length) {
  				this.current += dir;
  			} else {
  				this.current = 0;
  			}
  		} else {
  			this.current = this.slides.length - 1;
  		}
  		this.setCurrent(dir);
  	}

  	async initType() {
  		this.arrows.forEach( function(e, index) {
  			if(index == 0 && this.direction == 1) {
  				e.classList.add('arrow-up')
  			} else if (index == 1 && this.direction == 1) {
  				e.classList.add('arrow-down');
  			} else if(index == 0) {
  				e.classList.add('arrow-left');
  			} else if (index == 1) {
  				e.classList.add('arrow-right');
  			}
  		}.bind(this));	
  	}

  	async indHandlerClick(e) {
  		this.changeSlide(this.indicators.indexOf(e.target)-this.current);
  	}

  	//Add Event Listener for Arrows
  	async initArrows() {
  		this.arrows.forEach( function(e){
  			e.addEventListener('click', function (e) {
  				let dir;
  				dir = (this.arrows[0] == e.target) ? -1 : 1;
  				this.changeSlide(dir);
  			}.bind(this));
  		}.bind(this));
  	}

  	//Initialize slider
  	async initSlider() {
  		document.querySelectorAll(`.${this.wrapper} *`).forEach( function (e){
  			if(e.classList.contains('slide')) {
  				this.slides.push(e);
  			}else if (e.classList.contains('arrow')) {
  				this.arrows.push(e);
  			}else if (e.classList.contains('indicator')) {
  				this.indicators.push(e);
  				e.addEventListener('click', function (event) {
  					this.indHandlerClick(event);
  				}.bind(this));
  			}
  		}.bind(this));

  		this.domWrapper.classList.add('Slider__Wrapper');

  		if(this.direction){
  			this.domWrapper.classList.add('Slider__Vertical');
  		} else {
  			this.domWrapper.classList.add('Slider__Horizontal');
  		}

  		this.domWrapper.addEventListener('mousemove', function (e) {
  			if(this.isMouseDown){
  				if(this.direction == 1){
	  				this.dx += e.movementY;
	  			} else {
		  			this.dx += e.movementX;
	  			}
  			}
  		}.bind(this));

  		this.domWrapper.addEventListener('mousedown', function () {
  			this.dx = 0;
  			this.isMouseDown = 1;
  		}.bind(this));

  		this.domWrapper.addEventListener('mouseup', function () {
  			this.isMouseDown = 0;
  			this.callChgSlide();
  		}.bind(this));

  		this.domWrapper.addEventListener('touchstart', function(e) {
  			if(this.direction == 1){
  				this.dx = e.touches[0].clientY;
  			} else {
				this.dx = e.touches[0].clientX;
  			}
		}.bind(this));

		this.domWrapper.addEventListener('touchend', function(e) {
			if(this.direction == 1){
  				this.dx = e.changedTouches[0].clientY * -1;
  			} else {
				this.dx = e.changedTouches[0].clientX * -1;
  			}
			this.dx /= -30;
			this.callChgSlide();			
		}.bind(this));
  	}


} 