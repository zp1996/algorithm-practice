"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _config = require("./config");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var width,
    height,
    r = _config2.default.radius;
function Draw(canvas) {
	this.cache = [];
	this.init(canvas);
}
Draw.prototype.init = function (canvas) {
	this.ctx = canvas.getContext("2d");
	this.ctx.font = _config2.default.font;
	this.ctx.textAlign = "center";
	height = canvas.height;
	width = canvas.width;
	this.startX = width / 2;
	this.startY = r;
};
Draw.prototype.round = function (x, y, value) {
	this.ctx.beginPath();
	this.ctx.arc(x, y, r, 0, 2 * Math.PI, 0);
	this.ctx.fillStyle = "blue";
	this.ctx.fill();
	this.font(x, y, value);
};
Draw.prototype.font = function (x, y, value) {
	this.ctx.fillStyle = _config2.default.color;
	this.ctx.fillText(value, x, y + _config2.default.dev);
};
Draw.prototype.draw = function (root) {
	this.ctx.clearRect(0, 0, width, height);
	this.PreOrder(root, this.startX, this.startY, 500);
	this.line();
};
Draw.prototype.PreOrder = function (root, x, y, w) {
	if (root == null) return void 0;
	var lx = x - w / 2,
	    rx = x + w / 2,
	    lry = y + 50;
	this.round(x, y, root.value);
	this.PreOrder(root.left, lx, lry, w / 2);
	this.PreOrder(root.right, rx, lry, w / 2);
	if (root.left) {
		this.cache.push({
			start: [x, y + r],
			end: [lx, lry - r]
		});
	}
	if (root.right) {
		this.cache.push({
			start: [x, y + r],
			end: [rx, lry - r]
		});
	}
};
Draw.prototype.line = function () {
	var _this = this;

	this.cache.forEach(function (val) {
		_this.ctx.beginPath();
		_this.ctx.strokeStyle = "#aaa";
		_this.ctx.moveTo.apply(_this.ctx, val.end);
		_this.ctx.lineTo.apply(_this.ctx, val.start);
		_this.ctx.stroke();
	});
	this.cache = [];
};
exports.default = Draw;