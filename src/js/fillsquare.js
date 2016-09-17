const rows = Array.from(document.getElementsByClassName("row")),
	arr = rows.map((val) => {
		return Array.from(val.getElementsByClassName("col"));
	}),
	special = [0, 1],
	className = " fill",
	cache = {},
	index = 0;

function toFill (r, c, s, pos) {
	const key = `${s}${r}${c}`;
	if (!cache[key]) {
		cache[key] = [pos];
	} else {
		cache[key].push(pos);
	}
}

function fill (tr, tc, dr, dc, size) {
    if (size === 1) return void 0;
    var s = size / 2;
    if (dr < tr + s && dc < tc + s) {
        fill(tr, tc, dr, dc, s);
    } else {
    		toFill(tr, tc, size, [tr + s - 1, tc + s - 1]);
        fill(tr, tc, tr + s - 1, tc + s - 1, s);
    }
    if (dr < tr + s && dc >= tc + s) {
        fill(tr, tc + s, dr, dc, s);
    } else {
    		toFill(tr, tc, size, [tr + s - 1, tc + s]);
        fill(tr, tc + s, tr + s - 1, tc + s, s);
    }
    if (dr >= tr + s && dc < tc + s) {
        fill(tr + s, tc, dr, dc, s);
    } else {
    		toFill(tr, tc, size, [tr + s, tc + s - 1]);
        fill(tr + s, tc, tr + s, tc + s - 1, s);
    }
    // 右下角
    if (dr >= tr + s && dc >= tc + s) {
        fill(tr + s, tc + s, dr, dc, s);
    } else {
    		toFill(tr, tc, size, [tr + s, tc + s]);
        fill(tr + s, tc + s, tr + s, tc + s, s);
    }
}
fill(0, 0, special[0], special[1], 4);
function *show() {
	for (let k in cache) {
		yield addClass(k);
	}
}
function addClass (key) {
	const len = cache[key].length;
	for (let i = 0; i < len; i++) {
		let pos = cache[key][i];
		arr[pos[0]][pos[1]].className += className;
	}
}
var start = show(),
	timer = setInterval(() => {
		if (start.next().done) {
			clearInterval(timer);
		}
	}, 2000);
