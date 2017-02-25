var b = {
	audio: null,
	post: !1,
	animate: {
		a: 0,
		b: 0,
		c: 0,
		d: 0,
		e: 0,
		f: 0
	},
	load: {
		count: 0,
		direction: 1,
		draw: !1,
		interval: null,
		frame: 0,
		frames: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15],
		once: !1,
		total: 0
	},
	sprites: {
		star: null,
		load: null,
		birdsside: null,
		birdstop: null,
		star: null
	},
	space: {
		alpha: 0,
		angle: 4.5,
		birds: 50,
		canvas: null,
		context: null,
		delta: 0,
		depth: 20,
		elements: [],
		index: 0,
		speed: -0.01
	},
	touch: {
		delta: 1,
		deltas: [{
			delta: 0,
			timeStamp: 0
		}],
		enabled: !1,
		pageY: 0
	},
	birds: {
		alpha: 0,
		bird: 0,
		canvas: null,
		context: null,
		frame: 0,
		id: {
			last: null,
			mine: null,
			view: null
		},
		name1: null,
		name2: null,
		rotate: 0,
		translate: {
			x: 0,
			y: 0
		}
	},
	samesession: !1,
	transition: !1,
	data: {
		birds: null,
		content: null
	},
	debug: {
		enabled: !1,
		fps: {
			date: null,
			sift: 20,
			tick: null,
			time: null
		}
	},
	draw: {
		date: null,
		rate: 60,
		time: null
	},
	page: null,
	previous: [],
	version: "0.9.0"
};

function SpaceObj(a, c, d, e, f) {
	this.alpha = 1;
	this.animate = a;
	this.dy = this.dx = this.dw = this.dh = 0;
	this.scale = c;
	this.x = d;
	this.y = e;
	this.z = f
}
SpaceBird.prototype = new SpaceObj;

function SpaceBird() {
	SpaceObj.apply(this, arguments);
	this.id = arguments[5];
	this.bird = arguments[6];
	this.frame = Math.floor(9 * Math.random());
	this.frames = [0, 1, 2, 1];
	this.sw = this.sh = 80;
	this.sy = this.sx = 0
}
SpaceBird.prototype.update = function() {
	this.z += b.space.speed * (1 + b.space.delta) / 2;
	0 > this.z && (b.space.index++, b.space.index > b.data.birds.length - 1 && (b.space.index = 0), this.id = b.data.birds[b.space.index].id, this.bird = b.data.birds[b.space.index].bird, this.z += b.space.depth);
	this.z > b.space.depth && (b.space.index--, 0 > b.space.index && (b.space.index = b.data.birds.length - 1), this.id = b.data.birds[b.space.index].id, this.bird = b.data.birds[b.space.index].bird, this.z %= b.space.depth);
	this.alpha = Math.min(1, (b.space.depth - this.z) / (b.space.depth / 2));
	this.frame = 12 > this.frame + 1 ? this.frame + 1 : 0;
	this.sx = this.frames[Math.floor(this.frame / 3)] * this.sw;
	this.sy = this.bird * this.sh;
	this.dw = this.sw * Math.pow((b.space.depth - this.z) / b.space.depth, 2) * this.scale;
	this.dh = this.sh * Math.pow((b.space.depth - this.z) / b.space.depth, 2) * this.scale;
	this.dx = b.space.canvas.width / 2 - this.dw / 2 + Math.pow(b.space.depth / this.z, 3.5) * (this.x + 10 * b.animate[this.animate[0]] - 5);
	this.dy = b.space.canvas.height / b.space.angle - this.dh / 2 + Math.pow(b.space.depth / this.z, 2) * (this.y + 10 * b.animate[this.animate[1]] - 5)
};
SpaceBird.prototype.draw = function() {
	0 < this.dx + this.dw && this.dx < b.space.canvas.width && 0 < this.dy + this.dh && this.dy < b.space.canvas.height && (b.space.context.save(), b.space.context.globalAlpha = b.space.alpha, b.space.context.drawImage(b.sprites.birdstop, this.sx, this.sy, this.sw, this.sh, this.dx, this.dy, this.dw, this.dh), b.space.context.restore())
};
SpaceBridge.prototype = new SpaceObj;

function SpaceBridge() {
	SpaceObj.apply(this, arguments)
}
SpaceBridge.prototype.update = function() {
	this.z += b.space.speed * (1 + b.space.delta);
	0 > this.z && (this.z += b.space.depth);
	this.z > b.space.depth && (this.z %= b.space.depth);
	this.alpha = Math.min(1, (b.space.depth - this.z) / (b.space.depth / 2));
	this.dw = Math.max(2, Math.pow(b.sprites.star.width / this.z, 2) * this.scale);
	this.dh = Math.max(2, Math.pow(b.sprites.star.height / this.z, 2) * this.scale);
	this.dx = b.space.canvas.width / 2 - this.dw / 2 + Math.pow(b.space.depth / this.z, 3.5) * this.x;
	this.dy = b.space.canvas.height / b.space.angle - this.dh / 2 + Math.pow(b.space.depth / this.z, 2) * this.y
};
SpaceBridge.prototype.draw = function() {
	0 < this.dx + this.dw && this.dx < b.space.canvas.width && 0 < this.dy + this.dh && this.dy < b.space.canvas.height && (b.space.context.save(), b.space.context.globalAlpha = b.animate[this.animate[0]] * this.alpha * b.space.alpha, b.space.context.drawImage(b.sprites.star, 0, 0, b.sprites.star.width, b.sprites.star.height, this.dx, this.dy, this.dw, this.dh), b.space.context.restore())
};
SpaceProduct.prototype = new SpaceObj;

function SpaceProduct() {
	SpaceObj.apply(this, arguments);
	this.bird = arguments[5];
	this.frame = Math.floor(9 * Math.random());
	this.frames = [0, 1, 2, 1];
	this.sw = this.sh = 80;
	this.sy = this.sx = 0
}
SpaceProduct.prototype.update = function() {
	this.z += b.space.speed * (1 + b.space.delta) / 2;
	0 > this.z && (this.z += b.space.depth);
	this.z > b.space.depth && (this.z %= b.space.depth);
	this.alpha = Math.min(1, (b.space.depth - this.z) / (b.space.depth / 2));
	this.frame = 12 > this.frame + 1 ? this.frame + 1 : 0;
	this.sx = this.frames[Math.floor(this.frame / 3)] * this.sw;
	this.sy = this.bird * this.sh;
	this.dw = this.sw * Math.pow((b.space.depth - this.z) / b.space.depth, 2) * this.scale;
	this.dh = this.sh * Math.pow((b.space.depth - this.z) / b.space.depth, 2) * this.scale;
	this.dx = b.space.canvas.width / 2 - this.dw / 2 + Math.pow(b.space.depth / this.z, 3.5) * (this.x + 10 * b.animate[this.animate[0]] - 5);
	this.dy = b.space.canvas.height / b.space.angle - this.dh / 2 + Math.pow(b.space.depth / this.z, 2) * (this.y + 10 * b.animate[this.animate[1]] - 5)
};
SpaceProduct.prototype.draw = function() {
	0 < this.dx + this.dw && this.dx < b.space.canvas.width && 0 < this.dy + this.dh && this.dy < b.space.canvas.height && (b.space.context.save(), b.space.context.globalAlpha = b.space.alpha, b.space.context.drawImage(b.sprites.birdstop, this.sx, this.sy, this.sw, this.sh, this.dx, this.dy, this.dw, this.dh), b.space.context.restore())
};
SpaceStar.prototype = new SpaceObj;

function SpaceStar() {
	SpaceObj.apply(this, arguments)
}
SpaceStar.prototype.update = function() {
	this.z += b.space.speed * (1 + b.space.delta);
	0 > this.z && (this.z += b.space.depth);
	this.z > b.space.depth && (this.z %= b.space.depth);
	this.alpha = Math.min(1, (b.space.depth - this.z) / (b.space.depth / 2));
	this.dw = Math.max(2, Math.pow(b.sprites.star.width / this.z, 2) * this.scale);
	this.dh = Math.max(2, Math.pow(b.sprites.star.height / this.z, 2) * this.scale);
	this.dx = b.space.canvas.width / 2 - this.dw / 2 + Math.pow(b.space.depth / this.z, 3.5) * this.x;
	this.dy = b.space.canvas.height / b.space.angle - this.dh / 2 + Math.pow(b.space.depth / this.z, 2) * this.y
};
SpaceStar.prototype.draw = function() {
	0 < this.dx + this.dw && this.dx < b.space.canvas.width && 0 < this.dy + this.dh && this.dy < b.space.canvas.height && (b.space.context.save(), b.space.context.globalAlpha = b.animate[this.animate[0]], b.space.context.drawImage(b.sprites.star, 0, 0, b.sprites.star.width, b.sprites.star.height, this.dx, this.dy, this.dw, this.dh), b.space.context.restore())
};

function animate(a) {
	$(b.animate).animate(a, {
		complete: function() {
			for (var c in a) a[c] = Math.random();
			animate(a)
		},
		duration: 1E3 * Math.random() + 1E3,
		easing: "easeInOutQuad",
		queue: !1
	})
}

function draw() {
	requestAnimationFrame(draw);
	var a = new Date,
		c = a - b.draw.date;
	if (c > b.draw.time) {
		b.draw.date = a - c % b.draw.time;
		b.space.context.clearRect(0, 0, b.space.canvas.width, b.space.canvas.height);
		b.load.draw && (b.space.context.save(), b.space.context.translate(b.space.canvas.width / 2, b.space.canvas.height / 2), b.space.context.drawImage(b.sprites.load, 200 * (b.load.frames[Math.floor(b.load.frame / 3)] % 4), 200 * Math.floor(b.load.frames[Math.floor(b.load.frame / 3)] / 4), 200, 200, -100, -100, 200, 200), b.space.context.restore(), 0 < b.load.direction ? b.load.frame < 3 * b.load.frames.length - 1 ? b.load.frame++ : (b.load.direction = -1, b.load.frame--) : 0 < b.load.frame ? b.load.frame-- : (b.load.once || (b.load.once = !0, init()), b.load.direction = 1, b.load.frame++));
		for (c = 0; c < b.space.elements.length; c++) b.space.elements[c].update();
		b.space.elements.sort(function(a, c) {
			return a.y > c.y ? -1 : a.y < c.y ? 1 : a.z > c.z ? 1 : a.z < c.z ? -1 : 0
		});
		for (c = 0; c < b.space.elements.length; c++)(b.space.elements[c] instanceof SpaceStar || 0 != b.space.alpha) && b.space.elements[c].draw();
		b.space.delta = 0;
		b.birds.context && (b.birds.context.clearRect(0, 0, b.birds.canvas.width, b.birds.canvas.height), b.sprites.birdsside && (b.birds.context.save(), b.birds.context.globalAlpha = b.birds.alpha, b.birds.context.translate(b.birds.canvas.width / 2 + 90 * b.animate.a - 45, b.birds.canvas.height / 2 + 30 * b.animate.b - 15), b.birds.context.rotate((10 * b.animate.c - 5) * Math.PI / 180), b.birds.context.drawImage(b.sprites.birdsside, 400 * [0, 1, 2, 1][Math.floor(b.birds.frame / 3)], 270 * b.birds.bird, 400, 270, -200, -135, 400, 270), b.birds.context.restore()), b.birds.frame = 12 > b.birds.frame + 1 ? b.birds.frame + 1 : 0);
		b.debug.enabled && (b.debug.fps.tick(a), b.space.context.fillStyle = "#F00", b.space.context.font = "14px Arial", b.space.context.textAlign = "center", a = a.toUTCString(), b.space.context.fillText("VERSION " + b.version + " / " + Math.round(1E3 / b.debug.fps.time) + " FPS", b.space.canvas.width / 2, 35))
	}
}

function find(a, c) {
	for (var d = [], e = 0; e < b.space.elements.length; e++) if (b.space.elements[e] instanceof SpaceBird || b.space.elements[e] instanceof SpaceProduct) {
		var f = b.space.elements[e],
			g = Math.sqrt(Math.pow(a - (f.dx + f.dw / 2) / 2, 2) + Math.pow(c - (f.dy + f.dh / 2) / 2, 2));
		d.push({
			bird: f,
			distance: g
		})
	}
	d.sort(function(a, c) {
		return a.distance - c.distance
	});
	d[0].distance < d[0].bird.dw / 2 && (d[0].bird instanceof SpaceBird ? (b.birds.id.view = d[0].bird.id, track("BRIDGE_USER_BIRD"), openPage("birds", "bridge")) : (b.birds.bird = d[0].bird.bird, track("BRIDGE_PRODUCT_BIRD"), openPage("products", "bridge")))
}

function initSpaceBirds() {
	for (var a = [], c = 0; c < b.space.elements.length; c++) b.space.elements[c] instanceof SpaceBird || a.push(b.space.elements[c]);
	b.space.elements = a;
	a = Math.min(b.space.birds, b.data.birds.length);
	for (c = 0; c < a; c++) {
		b.space.index = c;
		var d = "abcdef".split("");
		d.sort(function(a, c) {
			return Math.random() - Math.random()
		});
		b.space.elements.push(new SpaceBird(d, 4, 15 * Math.cos(180 * Math.random() * Math.PI / 180), 50 * Math.random() + 100, b.space.depth / a * c, b.data.birds[c].id, b.data.birds[c].bird))
	}
}

function init() {
	if (b.data.birds && b.data.content && b.load.count == b.load.total && b.load.once && b.sprites.birdsside && b.sprites.birdstop) {
		b.load.draw = !1;
		initSpaceBirds();
		for (var a = 0; 6 > a; a++) {
			var c = "abcdef".split("");
			c.sort(function(a, c) {
				return Math.random() - Math.random()
			});
			b.space.elements.push(new SpaceProduct(c, 6, 2 * Math.cos(180 * Math.random() * Math.PI / 180), 80, b.space.depth / 6 * a, a))
		}
		for (a = 0; 500 > a; a++) c = "abcdef".split(""), c.sort(function(a, c) {
			return Math.random() - Math.random()
		}), b.space.elements.push(new SpaceBridge(c, 2 * Math.random() + 1, 10 * Math.cos(360 * Math.random() * Math.PI / 180), 50 * Math.random() + 80, Math.random() * b.space.depth));
		$("input[type='text'], input[type='tel']").on("focus", function() {
			$(this).removeClass("error")
		});
		$(".close").on("click", function(a) {
			a.preventDefault();
			switch (b.page) {
			case "birds":
				"home" == b.previous[0] ? track("SHARED_BIRD_CLOSE") : b.birds.id.mine == b.birds.id.view ? track("MY_BIRD_CLOSE") : track("BIRD_CLOSE");
				break;
			case "create":
				track("CREATE_CLOSE");
				break;
			case "products":
				track("PRODUCT_CLOSE");
				break;
			case "qrcode":
				track("QRCODE_CLOSE");
				break;
			case "sweepstakes":
				track("SWEEPSTAKES_CLOSE");
				break;
			case "terms":
				track("TERMS_CLOSE")
			}
			0 < b.previous.length && (a = b.previous.pop(), openPage(a));
			return !1
		});
		$("#birds .home").on("click", function(a) {
			a.preventDefault();
			track("SHARED_BIRD_HOME");
			b.previous = [];
			openPage("home");
			return !1
		});
		$("#birds .product").on("click", function(a) {
			a.preventDefault();
			"home" == b.previous[0] ? track("SHARED_BIRD_PRODUCT") : b.birds.id.mine == b.birds.id.view ? track("MY_BIRD_PRODUCT") : track("BIRD_PRODUCT");
			openPage("products", "birds");
			return !1
		});
		$("#birds .share").on("click", function(a) {
			a.preventDefault();
			"home" == b.previous[0] ? track("SHARED_BIRD_SHARE") : b.birds.id.mine == b.birds.id.view ? track("MY_BIRD_SHARE") : track("BIRD_SHARE");
			$("#birds .clicked").show();
			$("#birds .default").hide();
			return !1
		});
		$("#bridge .bird").on("click", function(a) {
			a.preventDefault();
			b.samesession ? track("BRIDGE_MY_BIRD_FIRST") : track("BRIDGE_MY_BIRD_AGAIN");
			b.birds.id.view = b.birds.id.mine;
			openPage("birds", "bridge");
			return !1
		});
		$("#bridge .create").on("click", function(a) {
			a.preventDefault();
			b.birds.id.mine ? track("BRIDGE_CREATE_AGAIN") : track("BRIDGE_CREATE_FIRST");
			openPage("create", "bridge");
			return !1
		});
		$("#bridge .follow").on("click", function(a) {
			a.preventDefault();
			openPage("qrcode", "bridge");
			return !1
		});
		$("#bridge .qrcode").on("click", function(a) {
			a.preventDefault();
			openPage("qrcode", "bridge");
			return !1
		});
		$("#bridge .sweepstakes").on("click", function(a) {
			a.preventDefault();
			track("BRIDGE_SWEEPSTAKES");
			openPage("sweepstakes", "bridge");
			return !1
		});
		$("#create form").submit(function(a) {
			a.preventDefault();
			$("#create input").removeClass("error");
			var c;
			$("#create input[type='text']").each(function() {
				"" == $(this).val() && ($(this).addClass("error"), c = !0)
			});
			c || (track("CREATE_SUBMIT"), $("#create input[type='submit']").attr("disabled", "disabled"), $.get("birds.json", {
				id: "create",
				bird: b.birds.bird,
				name1: $("#create input[name='name-1']").val(),
				name2: $("#create input[name='name-2']").val()
			}, function(a) {
				"success" == a.status ? (setCookie("id", a.data.id, 3E11), b.birds.id.mine = a.data.id, b.previous = [], b.samesession = !0, openPage("bridge")) : $("#create input[type='submit']").removeAttr("disabled")
			}, "json"));
			return !1
		});
		$("#create .materials > div").each(function(a) {
			$(this).on("click", function(c) {
				c.preventDefault();
				$(this).addClass("active").siblings().removeClass("active");
				b.birds.bird = a;
				track("CREATE_MATERIAL_" + (a + 1));
				$("#create .name").html("[ " + b.data.content.products[b.birds.bird].name + " ]").removeAttr("class").addClass("name color-" + a);
				return !1
			})
		});
		$("#history .home").on("click", function(a) {
			a.preventDefault();
			track("HISTORY_HOME");
			openPage("home");
			return !1
		});
		$("#history .start").on("click", function(a) {
			a.preventDefault();
			track("HISTORY_START");
			ambiance();
			openPage("bridge");
			return !1
		});
		$("#home .history").on("click", function(a) {
			a.preventDefault();
			track("HOME_HISTORY");
			openPage("history");
			return !1
		});
		$("#home .start").on("click", function(a) {
			a.preventDefault();
			track("HOME_START");
			ambiance();
			openPage("bridge");
			return !1
		});
		$("#sweepstakes form").submit(function(a) {
			a.preventDefault();
			$("#sweepstakes input").removeClass("error");
			var c;
			"" == $("#sweepstakes input[name='name']").val() && ($("#sweepstakes input[name='name']").addClass("error"), c = !0);
			"" == $("#sweepstakes input[name='phone']").val() && ($("#sweepstakes input[name='phone']").addClass("error"), c = !0);
			c || (track("SWEEPSTAKES_SUBMIT"), $("#sweepstakes input[type='submit']").attr("disabled", "disabled"), $.get("birds.json", {
				id: "sweepstakes",
				name: $("#sweepstakes input[name='name']").val(),
				weixin: $("#sweepstakes input[name='weixin']").val(),
				phone: $("#sweepstakes input[name='phone']").val()
			}, function(a) {
				"success" == a.status ? (b.previous = [], openPage("qrcode", "bridge")) : $("#sweepstakes input[type='submit']").removeAttr("disabled")
			}, "json"));
			return !1
		});
		$("#sweepstakes .terms").on("click", function(a) {
			a.preventDefault();
			track("SWEEPSTAKES_TERMS");
			openPage("terms", "sweepstakes");
			return !1
		});
		$("#terms .external").on("click", function(a) {
			a.preventDefault();
			track("TERMS_EXTERNAL");
			window.open("http://www.ballyofswitzerland.com/zh/client-services/privacy-policy.html", "_blank");
			return !1
		});
		/#[0-9]/.test(window.location.hash) ? (b.birds.id.view = window.location.hash.substr(1), openPage("birds", "home")) : openPage("home")
	}
}

function openPage(a, c) {
	if (!b.transition && a) if (b.transition = !0, b.page = a, $("#main > div").stop(!0).fadeOut(500, "easeInOutQuad"), c && b.previous.push(c), "bridge" == b.page) $.get("birds.json", {
		id: "birds",
		last: b.birds.id.last
	}, function(a) {
		if ("success" == a.status) {
			for (var c = [], d = b.birds.id.last, e = 0; e < a.data.length; e++) d = parseInt(a.data[e][0]), c.push({
				id: d,
				bird: parseInt(a.data[e][1]),
				name1: a.data[e][2],
				name2: a.data[e][3]
			});
			b.birds.id.last = d;
			b.data.birds = b.data.birds.concat(c);
			initSpaceBirds();
			$("#bridge .count").html(b.data.birds.length);
			!b.post && b.birds.id.mine ? ($("#bridge .container").eq(1).show(), $("#bridge .container").eq(0).hide(), b.samesession ? ($("#bridge .container").eq(1).find(".create").hide(), $("#bridge .container").eq(1).find(".qrcode").show()) : ($("#bridge .container").eq(1).find(".create").show(), $("#bridge .container").eq(1).find(".qrcode").hide())) : ($("#bridge .container").eq(0).show(), $("#bridge .container").eq(1).hide(), b.post ? ($("#bridge .container").eq(0).find(".create").hide(), $("#bridge .container").eq(0).find(".follow").show()) : ($("#bridge .container").eq(0).find(".create").show(), $("#bridge .container").eq(0).find(".follow").hide()));
			$(b.space).stop(!0).delay(250).animate({
				alpha: 1
			}, {
				duration: 500,
				easing: "easeInOutQuad",
				queue: !1
			});
			share();
			show()
		}
	}, "json");
	else {
		$(b.space).stop(!0).animate({
			alpha: 0
		}, {
			duration: 500,
			easing: "easeInOutQuad",
			queue: !1
		});
		if ("birds" == b.page) {
			for (var d = !1, e = 0; e < b.data.birds.length; e++) if (b.data.birds[e].id == b.birds.id.view) {
				d = !0;
				b.birds.bird = b.data.birds[e].bird;
				b.birds.name1 = b.data.birds[e].name1;
				b.birds.name2 = b.data.birds[e].name2;
				e = 5 == b.birds.bird ? "color-5-birds" : "color-" + b.birds.bird;
				$("#birds .name").html("[ " + b.data.content.products[b.birds.bird].name + " ]").removeAttr("class").addClass("name " + e);
				$("#birds .description").html("见证" + b.birds.name1 + "和" + b.birds.name2 + "的爱情");
				$("#birds .product").html(b.data.content.products[b.birds.bird].name);
				break
			}
			if (!d) {
				b.previous = [];
				b.transition = !1;
				openPage("home");
				return
			}
			$("#birds .clicked").hide();
			$("#birds .default").show();
			"home" == b.previous[0] ? ($("#birds .home").show(), $("#birds .share").hide()) : ($("#birds .home").hide(), $("#birds .share").show());
			b.post && $("#birds .share").hide()
		} else "create" == b.page ? ($("#create input[type='submit']").removeAttr("disabled"), $("#create .name").html("[ " + b.data.content.products[b.birds.bird].name + " ]").removeAttr("class").addClass("name color-0"), $("#create .materials > div").eq(0).addClass("active").siblings().removeClass("active")) : "products" == b.page ? ($("#products .table-row").eq(0).find("img").eq(b.birds.bird).show().siblings().hide(), $("#products .name").html(b.data.content.products[b.birds.bird].name).removeAttr("class").addClass("name color-" + b.birds.bird), $("#products .description").html(b.data.content.products[b.birds.bird].description)) : "reminder" == b.page ? setTimeout(function() {
			openPage("bridge")
		}, 2500) : "sweepstakes" == b.page && ($("#sweepstakes input[type='submit']").removeAttr("disabled"), $("#sweepstakes input[type='tel']").val(""), $("#sweepstakes input[type='text']").val(""));
		share();
		show()
	}
}

function ambiance() {
	b.audio = $("audio")[0];
	b.audio.src = "images/ambiance.mp3";
	b.audio.play()
}

function share() {
	var a, c, d, e, f;
	"birds" == b.page ? (window.location.hash = "#" + b.birds.id.view, a = b.data.content.share.chat.birds.title.replace("%NAME1%", b.birds.name1).replace("%NAME2%", b.birds.name2), c = b.data.content.share.chat.birds.description, d = b.data.content.share.moments.birds.title.replace("%NAME1%", b.birds.name1).replace("%NAME2%", b.birds.name2), e = window.location.href, f = window.location.origin + window.location.pathname + "images/share-" + (b.birds.bird + 1) + ".jpg") : (window.location.hash = "", supportsHistory && window.history.pushState("", "", window.location.origin + window.location.pathname), a = b.data.content.share.chat.other.title, c = b.data.content.share.chat.other.description, d = b.data.content.share.moments.other.title, e = window.location.href, f = window.location.origin + window.location.pathname + "images/share.jpg");
	/micromessenger/.test(navigator.userAgent.toLowerCase()) && (wx.ready(function() {
		wx.onMenuShareAppMessage({
			title: a,
			desc: c,
			link: e,
			imgUrl: f,
			type: "link",
			success: function() {
				"birds" == b.page ? b.birds.id.mine == b.birds.id.view ? track("SHARE_MY_BIRD_TO_CHAT_SUCCESS") : track("SHARE_BIRD_TO_CHAT_SUCCESS") : track("SHARE_DEFAULT_TO_CHAT_SUCCESS")
			},
			cancel: function() {
				"birds" == b.page ? b.birds.id.mine == b.birds.id.view ? track("SHARE_MY_BIRD_TO_CHAT_CANCEL") : track("SHARE_BIRD_TO_CHAT_CANCEL") : track("SHARE_DEFAULT_TO_CHAT_CANCEL")
			}
		});
		wx.onMenuShareTimeline({
			title: d,
			link: e,
			imgUrl: f,
			success: function() {
				"birds" == b.page ? b.birds.id.mine == b.birds.id.view ? track("SHARE_MY_BIRD_TO_MOMENTS_SUCCESS") : track("SHARE_BIRD_TO_MOMENTS_SUCCESS") : track("SHARE_DEFAULT_TO_MOMENTS_SUCCESS")
			},
			cancel: function() {
				"birds" == b.page ? b.birds.id.mine == b.birds.id.view ? track("SHARE_MY_BIRD_TO_MOMENTS_CANCEL") : track("SHARE_BIRD_TO_MOMENTS_CANCEL") : track("SHARE_DEFAULT_TO_MOMENTS_CANCEL")
			}
		})
	}), wx.error(function(a) {}))
}

function show() {
	$("#" + b.page).stop(!0).delay(250).fadeIn(500, "easeInOutQuad", function() {
		"birds" == b.page || "create" == b.page ? (b.birds.canvas = $("#" + b.page + " canvas")[0], b.birds.context = b.birds.canvas.getContext("2d"), onWindowResize(), $(b.birds).stop(!0).animate({
			alpha: 1
		}, {
			duration: 500,
			easing: "easeInOutQuad",
			queue: !1
		})) : (b.birds.context && b.birds.context.clearRect(0, 0, b.birds.canvas.width, b.birds.canvas.height), b.birds.alpha = 0, b.birds.canvas = null, b.birds.context = null);
		b.transition = !1
	});
	setTimeout(function() {
		$("#" + b.page).scrollTop(0)
	}, 275)
}
function onDocumentClick(a) {
	"bridge" == b.page && find(a.pageX, a.pageY)
}
function onDocumentMouseWheel(a) {
	if ("bridge" == b.page) return a.preventDefault(), onScrollHandler(-1 * a.deltaY * a.deltaFactor), !1
}

function onDocumentReady() {
	getCookie("id") && (b.birds.id.mine = parseInt(getCookie("id")));
	b.debug.enabled && (b.debug.fps.date = new Date, b.debug.fps.tick = function(a) {
		b.debug.fps.time += (a - b.debug.fps.date - b.debug.fps.time) / b.debug.fps.sift;
		b.debug.fps.date = a
	});
	b.draw.date = new Date;
	b.draw.time = 1E3 / b.draw.rate;
	b.space.canvas = $("#space")[0];
	b.space.context = b.space.canvas.getContext("2d");
	var a = new Image;
	a.async = !0;
	a.onload = onStarReady;
	a.src = "images/star.png";
	onOrientationChange()
}

function onDocumentTouchEnd(a) {
	if ("bridge" == b.page) if (0 < b.touch.deltas.length) {
		b.touch.deltas.reverse();
		for (var c = 0; c < b.touch.deltas.length && !(50 < a.timeStamp - b.touch.deltas[c].timeStamp); c++) b.touch.delta += b.touch.deltas[c].delta;
		0 != b.touch.delta && (b.touch.delta /= c, $(b.touch).stop(!0).animate({
			delta: 0
		}, {
			duration: Math.abs(75 * b.touch.delta),
			easing: "easeOutQuint",
			step: function(a) {
				onScrollHandler(b.touch.delta)
			}
		}))
	} else find(a.originalEvent.pageX, a.originalEvent.pageY)
}

function onDocumentTouchMove(a) {
	if ("bridge" == b.page) {
		a.preventDefault();
		var c = b.touch.pageY - a.originalEvent.touches[0].pageY;
		b.touch.deltas.push({
			delta: c,
			timeStamp: a.timeStamp
		});
		b.touch.pageY = a.originalEvent.touches[0].pageY;
		onScrollHandler(c);
		return !1
	}
}
function onDocumentTouchStart(a) {
	"bridge" == b.page && ($(b.touch).stop(!0), b.touch.delta = 0, b.touch.deltas = [], b.touch.pageY = a.originalEvent.touches[0].pageY)
}

function onLoadReady(a) {
	b.sprites.load = a.target;
	b.load.draw = !0;
	b.load.total = $("img[data-src]").length;
	$("img[data-src]").each(function(a, d) {
		$(this)[0].async = !0;
		$(this)[0].onload = function() {
			b.load.count++;
			init()
		};
		$(this)[0].src = $(this).attr("data-src")
	});
	a = new Image;
	a.async = !0;
	a.onload = function(a) {
		b.sprites.birdsside = a.target;
		init()
	};
	a.src = "images/birds-side.png";
	a = new Image;
	a.async = !0;
	a.onload = function(a) {
		b.sprites.birdstop = a.target;
		init()
	};
	a.src = "images/birds-top.png";
	$.get("birds.json", {
		id: "birds",
		last: 0
	}, function(a) {
		if ("success" == a.status) {
			for (var d = [], e = 0, f = 0; f < a.data.length; f++) e = parseInt(a.data[f][0]), d.push({
				id: e,
				bird: parseInt(a.data[f][1]),
				name1: a.data[f][2],
				name2: a.data[f][3]
			});
			b.birds.id.last = e;
			b.data.birds = d;
			init()
		}
	}, "json");
	$.get("content.json", {
		id: "content"
	}, function(a) {
		"success" == a.status && (b.data.content = a.data, share(), init())
	}, "json")
}

function onOrientationChange(a) {
	switch (window.orientation) {
	case -90:
	case 90:
		$("#main").hide();
		$("#turn").show();
		break;
	default:
		$("#main").show(), $("#turn").hide()
	}
}
function onScrollHandler(a) {
	b.space.delta -= a
}

function onStarReady(a) {
	b.sprites.star = a.target;
	for (a = 0; 200 > a; a++) {
		var c = "abcdef".split("");
		c.sort(function(a, c) {
			return Math.random() - Math.random()
		});
		var d = 360 * Math.random(),
			e = Math.random() * b.space.canvas.width / 3 + 10;
		b.space.elements.push(new SpaceStar(c, 2 * Math.random() + 1, Math.cos(d * Math.PI / 180) * e, Math.sin(d * Math.PI / 180) * e, Math.random() * b.space.depth))
	}
	animate({
		a: Math.random()
	});
	animate({
		b: Math.random()
	});
	animate({
		c: Math.random()
	});
	animate({
		d: Math.random()
	});
	animate({
		e: Math.random()
	});
	animate({
		f: Math.random()
	});
	onWindowResize();
	draw();
	a = new Image;
	a.async = !0;
	a.onload = onLoadReady;
	a.src = "images/load.png"
}
function onWindowResize(a) {
	b.birds.canvas && (b.birds.canvas.width = 2 * $(window).width(), b.birds.canvas.height = 300);
	b.space.canvas && (b.space.canvas.width = 2 * $(window).width(), b.space.canvas.height = 2 * $(window).height())
}
$(document).on("click", onDocumentClick);
$(document).on("mousewheel", onDocumentMouseWheel);
$(document).on("ready", onDocumentReady);
$(document).on("touchend", onDocumentTouchEnd);
$(document).on("touchmove", onDocumentTouchMove);
$(document).on("touchstart", onDocumentTouchStart);
$(window).on("orientationchange", onOrientationChange);
$(window).on("resize", onWindowResize);

function getCookie(a) {
	for (var c = document.cookie.split(";"), d = 0; d < c.length; d++) {
		var e = c[d].substr(0, c[d].indexOf("=")),
			f = c[d].substr(c[d].indexOf("=") + 1),
			e = e.replace(/^\s+|\s+$/g, "");
		if (e == a) return unescape(f)
	}
}

function getURLParameter(a) {
	return decodeURIComponent((RegExp("[?|&]" + a + "=([^&;]+?)(&|#|;|$)").exec(location.search) || [, ""])[1].replace(/\+/g, "%20")) || null
}
function setCookie(a, c, d) {
	var e = new Date;
	e.setDate(e.getDate() + d);
	c = escape(c) + (null == d ? "" : "; expires=" + e.toUTCString());
	document.cookie = a + "=" + c
}
function supportsHistory() {
	return !(!window.history || !history.pushState)
}
function track(a) {
	ga("send", "event", "click", "BallyValentinesDay", a);
	_hmt.push(["_trackEvent", "event", "click", a])
}(function() {
	for (var a = 0, c = ["ms", "moz", "webkit", "o"], d = 0; d < c.length && !window.requestAnimationFrame; ++d) window.requestAnimationFrame = window[c[d] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[c[d] + "CancelAnimationFrame"] || window[c[d] + "CancelRequestAnimationFrame"];
	window.requestAnimationFrame || (window.requestAnimationFrame = function(c, d) {
		var g = (new Date).getTime(),
			h = Math.max(0, 16 - (g - a)),
			k = window.setTimeout(function() {
				c(g + h)
			}, h);
		a = g + h;
		return k
	});
	window.cancelAnimationFrame || (window.cancelAnimationFrame = function(a) {
		clearTimeout(a)
	})
})();