import Draw from "./draw";
import BST from "./bst";
import AVL from "./avl";

function $ (selector) {
	return document.querySelector(selector);
}
var tree = null, value = "";
const canvas = $("#canvas"),
	draw = new Draw($("#canvas")),
	type = $("#type"),
	input = {
		delInput: $("#del-input"),
		insertInput: $("#insert-input")
	},
	now = $("#now"),
	handle = {
		bst: {
			init: () => {
				tree= new BST();
				tree.insert("S", "S")
				tree.insert("X", "X");
				tree.insert("E", "E");
				tree.insert("B", "B");
				tree.insert("C", "C");
				tree.insert("D", "D");
				tree.insert("Q", "Q");
				tree.insert("H", "H");
				tree.insert("M", "M");
				tree.insert("W", "W");
				update();
			}
		},
		avl: {
			init: () => {
				tree = new AVL();
				tree.insert(3, 3);
				tree.insert(2, 2);
				tree.insert(1, 1);
				tree.insert(4, 4);
				tree.insert(5, 5);
				tree.insert(6, 6);
				tree.insert(7, 7);
				tree.insert(10, 10);
				tree.insert(9, 9);
				tree.insert(8, 8);
				console.log(tree.root.bf);
				update();
			}
		},
		del: (key) => {
			tree.delete(key);
			update();
		},
		insert: (key) => {
			tree.insert(key, key);
			update();
		}
	};
window.onload = function () {
	init();
};

type.addEventListener("change", function () {
	init();
}, false);

$("#del").addEventListener("click", function () {
	change("del");
}, false);

$("#insert").addEventListener("click", function () {
	change("insert");
}, false);
function update () {
	draw.draw(tree.root);
	now.value = tree.orderTraversal && tree.orderTraversal();
}
function init () {
	value = type.value;
	handle[type.value].init();
}
function change (type) {
	var v = input[`${type}Input`].value;
	if (v === "") return void 0;
	v = isNaN(+v) ? v : +v;
	handle[type](v);
	input[`${type}Input`].value = "";
}