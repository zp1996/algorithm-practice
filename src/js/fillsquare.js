const rows = Array.from(document.getElementsByClassName("row")),
	arr = rows.map((val) => {
		return Array.from(val.getElementsByClassName("col"));
	}),
	special = [0, 1],
	className = " fill",
	cache = {},
	todo = document.getElementById("to-do");

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
fill(0, 0, special[0], special[1], 8);
function *show() {
	var arr = ["200", "202", "220", "222", "400",
						 "204", "206", "224", "226", "404",
						 "240", "242", "260", "262", "440",
						 "244", "246", "264", "266", "444",
						 "800"
						], len = arr.length;
	for (let i = 0; i < len; i++)
		yield addClass(arr[i]);
}
function addClass (key) {
	const len = cache[key].length;
	for (let i = 0; i < len; i++) {
		let pos = cache[key][i];
		arr[pos[0]][pos[1]].className += className;
	}
}
var start = show(),
	timer = null;

todo.addEventListener("click", () => {
	if (timer !== null) {
		return void 0;
	}
	start.next();
	timer = setInterval(() => {
		if (start.next().done) {
			clearInterval(timer);
		}
	}, 1000);
}, false);