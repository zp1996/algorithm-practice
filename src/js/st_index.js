import Draw from "./draw";
import BST from "./bst";
import AVL from "./avl";
import RBT from "./rbt";

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
				tree.insert("Y", "Y");
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
				update();
			}
		},
		rbt: {
			init: () => {
				tree = new RBT();
				tree.insert(8, 8);
				tree.insert(18, 18);
				tree.insert(28, 28);
				tree.insert(38, 38);
				tree.insert(20, 20);
				tree.insert(55, 55);
				tree.insert(65, 65);
				tree.insert(50, 50);
				tree.insert(49, 49);
				tree.insert(48, 48);
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