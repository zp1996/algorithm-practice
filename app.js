const express = require("express"),
	path = require("path"),
	app = express(),
	server = require("http").createServer(app);	

app.set("views", "./views");
app.set("view engine", "jade");

app.use(express.static(path.join(__dirname, "build/")));

app.get('/', (req, res) => {
	render(res, "./index");
});

app.get('/search-tree', (req, res) => {
	render(res, "./search-tree", {
		js: ["st_index.js"]
	});
});
app.get('/lru', (req, res) => {
	render(res, "./lru", {
		js: ["lru.js"]
	});
});
app.get('/fillsquare', (req, res) => {
	render(res, "./fillsquare", {
		js: ["fillsquare.js"]
	});
});

function render(res, url, obj) {
	const opts = {
		pretty: true,
		title: "算法演示",
	};
	if (obj) {
		for (let k in obj) 
			opts[k] = obj[k];
	}
	res.render(url, opts);
}

server.listen(666);

console.log("server is on...");