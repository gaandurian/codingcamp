
// SECTION TAA FIRE
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// console.clear();

var hamza = {};

/*
           |=|¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯/
[::{}{}{}{}|=| UTILITY
           |=|________________________________/
*/

hamza.PI = Math.PI;
hamza.TAU = hamza.PI * 2;

hamza.rand = function (min, max) {
	return Math.random() * (max - min) + min;
};

hamza.hsla = function (h, s, l, a) {
	return 'hsla(' + h + ', ' + s + '%, ' + l + '%, ' + a + ')';
};

hamza.baseRange = function (base, range) {
	return base + hamza.rand(-range, range);
};

/*
           |=|¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯/
[::{}{}{}{}|=| POOL
           |=|________________________________/
*/

hamza.Pool = function () {
	function _class(base, preallocateAmount) {
		_classCallCheck(this, _class);

		this.base = base;
		this.preallocateAmount = preallocateAmount || 0;
		this.alive = [];
		this.dead = [];
		this.length = 0;
		this.deadLength = 0;
		if (this.preallocateAmount) {
			this.preallocate();
		}
	}

	_createClass(_class, [{
		key: 'preallocate',
		value: function preallocate() {
			for (var i = 0; i < this.preallocateAmount; i++) {
				this.dead.push(new this.base());
				this.deadLength++;
			}
		}
	}, {
		key: 'create',
		value: function create(opt) {
			if (this.deadLength) {
				var obj = this.dead.pop();
				obj.init(opt);
				this.alive.push(obj);
				this.deadLength--;
				this.length++;
				return obj;
			} else {
				var newItem = new this.base();
				newItem.init(opt);
				this.alive.push(newItem);
				this.length++;
				return newItem;
			}
		}
	}, {
		key: 'release',
		value: function release(obj) {
			var i = this.alive.indexOf(obj);
			if (i > -1) {
				this.dead.push(this.alive.splice(i, 1)[0]);
				this.length--;
				this.deadLength++;
			}
		}
	}, {
		key: 'empty',
		value: function empty() {
			this.alive.length = 0;
			this.dead.length = 0;
			this.length = 0;
			this.deadLength = 0;
		}
	}, {
		key: 'each',
		value: function each(action, asc) {
			var i = this.length;
			while (i--) {
				this.alive[i][action](i);
			}
		}
	}]);

	return _class;
}();

/*
           |=|¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯/
[::{}{}{}{}|=| PARTICLE
           |=|________________________________/
*/

hamza.Particle = function () {
	function _class2() {
		_classCallCheck(this, _class2);
	}

	_createClass(_class2, [{
		key: 'init',
		value: function init(opt) {
			Object.assign(this, opt);
			this.life = 1;
		}
	}, {
		key: 'step',
		value: function step() {
			this.velocity += this.acceleration;
			this.angle += hamza.rand(-this.wander, this.wander);
			this.x += Math.cos(this.angle) * this.velocity;
			this.y += Math.sin(this.angle) * this.velocity;
			this.life -= this.decay;
			this.alpha = this.fade ? this.life * 1.5 : 1;
			if (this.life < 0) {
				this.parent.particles.release(this);
			}
		}
	}, {
		key: 'draw',
		value: function draw() {
			hamza.ctx.beginPath();
			hamza.ctx.arc(this.x, this.y, this.radius, 0, hamza.TAU);
			hamza.ctx.fillStyle = hamza.hsla(this.hue, this.saturation, this.lightness, this.alpha);
			hamza.ctx.fill();
		}
	}]);

	return _class2;
}();

/*
           |=|¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯/
[::{}{}{}{}|=| PARTICLE EMITTER
           |=|________________________________/
*/

hamza.ParticleEmitter = function () {
	function _class3(opt) {
		_classCallCheck(this, _class3);

		Object.assign(this, opt);
		this.particles = new hamza.Pool(hamza.Particle, 100);
	}

	_createClass(_class3, [{
		key: 'step',
		value: function step() {
			if (hamza.tick % this.interval === 0) {
				this.particles.create({
					parent: this,
					x: hamza.baseRange(this.x.base, this.x.range),
					y: hamza.baseRange(this.y.base, this.y.range),
					radius: hamza.baseRange(this.radius.base, this.radius.range),
					angle: hamza.baseRange(this.angle.base, this.angle.range),
					velocity: hamza.baseRange(this.velocity.base, this.velocity.range),
					acceleration: hamza.baseRange(this.acceleration.base, this.acceleration.range),
					decay: hamza.baseRange(this.decay.base, this.decay.range),
					hue: hamza.baseRange(this.hue.base, this.hue.range),
					saturation: hamza.baseRange(this.saturation.base, this.saturation.range),
					lightness: hamza.baseRange(this.lightness.base, this.lightness.range),
					wander: this.wander,
					fade: this.fade
				});
			}
			this.particles.each('step');
		}
	}, {
		key: 'draw',
		value: function draw() {
			hamza.ctx.globalCompositeOperation = this.blend;
			this.particles.each('draw');
		}
	}]);

	return _class3;
}();

/*
           |=|¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯/
[::{}{}{}{}|=| INIT
           |=|________________________________/
*/

hamza.init = function () {
	hamza.c = document.querySelector('canvas');
	hamza.ctx = hamza.c.getContext('2d');
	hamza.w = hamza.c.width = 400;
	hamza.h = hamza.c.height = 600;
	hamza.particleEmitters = [];
	hamza.tick = 1;

	// Spark Emitter
	hamza.particleEmitters.push(new hamza.ParticleEmitter({
		x: {
			base: hamza.w * 0.5,
			range: 20
		},
		y: {
			base: hamza.h,
			range: 20
		},
		radius: {
			base: 0.75,
			range: 0.4
		},
		angle: {
			base: -hamza.PI * 0.5,
			range: hamza.PI * 0.01
		},
		velocity: {
			base: 0.5,
			range: 0.5
		},
		acceleration: {
			base: 0.01,
			range: 0.01
		},
		decay: {
			base: 0.005,
			range: 0.001
		},
		hue: {
			base: 30,
			range: 30
		},
		saturation: {
			base: 80,
			range: 20
		},
		lightness: {
			base: 80,
			range: 20
		},
		wander: 0.06,
		blend: 'lighter',
		fade: true,
		interval: 5
	}));

	// Negative Emitter 1
	hamza.particleEmitters.push(new hamza.ParticleEmitter({
		x: {
			base: hamza.w - 100,
			range: 25
		},
		y: {
			base: hamza.h,
			range: 5
		},
		radius: {
			base: 20,
			range: 10
		},
		angle: {
			base: -hamza.PI * 0.55,
			range: hamza.PI * 0.05
		},
		velocity: {
			base: 2,
			range: 0
		},
		acceleration: {
			base: 0.02,
			range: 0.01
		},
		decay: {
			base: 0.001,
			range: 0
		},
		hue: {
			base: 0,
			range: 0
		},
		saturation: {
			base: 0,
			range: 0
		},
		lightness: {
			base: 0,
			range: 0
		},
		wander: 0.05,
		blend: 'destination-out',
		fade: false,
		interval: 1
	}));

	// Negative Emitter 2
	hamza.particleEmitters.push(new hamza.ParticleEmitter({
		x: {
			base: 100,
			range: 25
		},
		y: {
			base: hamza.h,
			range: 5
		},
		radius: {
			base: 20,
			range: 10
		},
		angle: {
			base: -hamza.PI * 0.45,
			range: hamza.PI * 0.05
		},
		velocity: {
			base: 2,
			range: 0
		},
		acceleration: {
			base: 0.02,
			range: 0.01
		},
		decay: {
			base: 0.001,
			range: 0
		},
		hue: {
			base: 0,
			range: 0
		},
		saturation: {
			base: 0,
			range: 0
		},
		lightness: {
			base: 0,
			range: 0
		},
		wander: 0.05,
		blend: 'destination-out',
		fade: false,
		interval: 1
	}));

	// Yellow Emitter
	hamza.particleEmitters.push(new hamza.ParticleEmitter({
		x: {
			base: hamza.w * 0.5,
			range: 20
		},
		y: {
			base: hamza.h,
			range: 20
		},
		radius: {
			base: 15,
			range: 5
		},
		angle: {
			base: -hamza.PI * 0.5,
			range: hamza.PI * 0.05
		},
		velocity: {
			base: 1.5,
			range: 0
		},
		acceleration: {
			base: 0.02,
			range: 0.01
		},
		decay: {
			base: 0.0075,
			range: 0
		},
		hue: {
			base: 60,
			range: 0
		},
		saturation: {
			base: 100,
			range: 0
		},
		lightness: {
			base: 70,
			range: 0
		},
		wander: 0.01,
		blend: 'source-over',
		fade: false,
		interval: 2
	}));

	// White Emitter
	hamza.particleEmitters.push(new hamza.ParticleEmitter({
		x: {
			base: hamza.w * 0.5,
			range: 20
		},
		y: {
			base: hamza.h - 20,
			range: 20
		},
		radius: {
			base: 2,
			range: 1
		},
		angle: {
			base: -hamza.PI * 0.5,
			range: hamza.PI * 0.001
		},
		velocity: {
			base: 0.5,
			range: 0
		},
		acceleration: {
			base: 0.02,
			range: 0.02
		},
		decay: {
			base: 0.0075,
			range: 0
		},
		hue: {
			base: 60,
			range: 0
		},
		saturation: {
			base: 90,
			range: 0
		},
		lightness: {
			base: 100,
			range: 0
		},
		wander: 0.025,
		blend: 'source-over',
		fade: false,
		interval: 3
	}));

	// Orange Emitter
	hamza.particleEmitters.push(new hamza.ParticleEmitter({
		x: {
			base: hamza.w * 0.5,
			range: 20
		},
		y: {
			base: hamza.h - 20,
			range: 15
		},
		radius: {
			base: 25,
			range: 5
		},
		angle: {
			base: -hamza.PI * 0.5,
			range: hamza.PI * 0.025
		},
		velocity: {
			base: 2,
			range: 0.25
		},
		acceleration: {
			base: 0.01,
			range: 0.01
		},
		decay: {
			base: 0.0075,
			range: 0
		},
		hue: {
			base: 30,
			range: 0
		},
		saturation: {
			base: 90,
			range: 0
		},
		lightness: {
			base: 50,
			range: 0
		},
		wander: 0.01,
		blend: 'source-over',
		fade: false,
		interval: 2
	}));

	// Red Emitter
	hamza.particleEmitters.push(new hamza.ParticleEmitter({
		x: {
			base: hamza.w * 0.5,
			range: 30
		},
		y: {
			base: hamza.h - 20,
			range: 15
		},
		radius: {
			base: 35,
			range: 10
		},
		angle: {
			base: -hamza.PI * 0.5,
			range: hamza.PI * 0.025
		},
		velocity: {
			base: 2,
			range: 0.25
		},
		acceleration: {
			base: 0.01,
			range: 0.01
		},
		decay: {
			base: 0.0075,
			range: 0
		},
		hue: {
			base: 0,
			range: 0
		},
		saturation: {
			base: 90,
			range: 0
		},
		lightness: {
			base: 50,
			range: 0
		},
		wander: 0.01,
		blend: 'source-over',
		fade: false,
		interval: 2
	}));

	hamza.gradient = hamza.ctx.createLinearGradient(0, 0, 0, hamza.h * 0.75);
	hamza.gradient.addColorStop(0, hamza.hsla(0, 0, 0, 1));
	hamza.gradient.addColorStop(1, hamza.hsla(0, 0, 0, 0));

	hamza.loop();
};

/*
           |=|¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯/
[::{}{}{}{}|=| STEP
           |=|________________________________/
*/

hamza.step = function () {
	var i = hamza.particleEmitters.length;
	while (i--) {
		hamza.particleEmitters[i].step();
	}
	hamza.tick++;
};

/*
           |=|¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯/
[::{}{}{}{}|=| DRAW
           |=|________________________________/
*/

hamza.draw = function () {
	// hamza.ctx.clearRect(0, 0, hamza.w, hamza.h);
	var i = hamza.particleEmitters.length;
	while (i--) {
		hamza.particleEmitters[i].draw();
	}

	hamza.ctx.globalCompositeOperation = 'destination-out';
	hamza.ctx.fillStyle = hamza.gradient;
	// hamza.ctx.fillRect(0, 0, hamza.w, hamza.h);

	// hamza.ctx.beginPath();
	// hamza.ctx.globalCompositeOperation = 'source-over';
	// hamza.ctx.arc(hamza.w * 0.5, hamza.h + 40, 63, 0, hamza.TAU);
	// hamza.ctx.fillStyle = '#f00';
	// hamza.ctx.fill();
  //
	// hamza.ctx.beginPath();
	// hamza.ctx.globalCompositeOperation = 'source-over';
	// hamza.ctx.arc(hamza.w * 0.5, hamza.h + 40, 60, 0, hamza.TAU);
	// hamza.ctx.fillStyle = '#000';
	// hamza.ctx.fill();
};

/*
           |=|¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯/
[::{}{}{}{}|=| LOOP
           |=|________________________________/
*/

hamza.loop = function () {
	requestAnimationFrame(hamza.loop);
	hamza.step();
	hamza.draw();
};

/*
           |=|¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯/
[::{}{}{}{}|=| TO BATTLE!
           |=|________________________________/
*/

hamza.init();
