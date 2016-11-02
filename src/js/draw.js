import config from "./config";

var width, height,
	r = config.radius;
function Draw (canvas) {
	this.cache = [];
	this.init(canvas);
}
Draw.prototype.init = function (canvas) {
	this.ctx = canvas.getContext("2d");
	this.ctx.font = config.font;
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
	this.ctx.fillStyle = config.color;
	this.ctx.fillText(value, x, y + config.dev);
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
	this.cache.forEach((val) => {
		this.ctx.beginPath();
		this.ctx.strokeStyle = "#aaa";
		this.ctx.moveTo.apply(this.ctx, val.end);
		this.ctx.lineTo.apply(this.ctx, val.start);
		this.ctx.stroke();
	});
	this.cache = [];
};
export default Draw;