"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _st_util = require("./st_util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BSTNode = function BSTNode(key, value) {
	(0, _classCallCheck3.default)(this, BSTNode);

	this.left = null;
	this.right = null;
	this.key = key;
	this.value = value;
};

function Node(key, value) {
	return new BSTNode(key, value);
}

var BinarySearchTree = function () {
	function BinarySearchTree() {
		(0, _classCallCheck3.default)(this, BinarySearchTree);

		this.root = null;
		this.length = 0;
		this.order = "";
	}

	(0, _createClass3.default)(BinarySearchTree, [{
		key: "get",
		value: function get(key) {
			return (0, _st_util.getValue)(this.root, key);
		}
		// 插入节点

	}, {
		key: "insert",
		value: function insert(key, value) {
			if (key == null || value == null) throw new Error("参数传入有误");
			this.root = InsertNode(this.root, key, value);
			this.length++;
		}
		// 获取最大值

	}, {
		key: "max",
		value: function max() {
			if (this.root === null) return void 0;
			return (0, _st_util.getMaxNode)(this.root).value;
		}
		// 获取最小值

	}, {
		key: "min",
		value: function min() {
			if (this.root === null) return void 0;
			return (0, _st_util.getMinNode)(this.root).value;
		}
		// 找到小于等于key中的最大值

	}, {
		key: "getFloor",
		value: function getFloor(key) {
			if (key == null) throw new Error("参数传入有误");
			var current = GetFloor(this.root, key);
			return current && current.key;
		}
		// 找到大于等于key中的最小值

	}, {
		key: "getCelling",
		value: function getCelling(key) {
			if (key == null) throw new Error("参数传入有误");
			var current = GetCelling(this.root, key);
			return current && current.key;
		}
		// 删除最小节点

	}, {
		key: "delMin",
		value: function delMin() {
			if (this.root === null) return void 0;
			this.root = DeleteMin(this.root);
			this.length--;
		}
		// 删除最大的节点

	}, {
		key: "delMax",
		value: function delMax() {
			if (this.root === null) return void 0;
			this.root = DeleteMax(this.root);
			this.length--;
		}
		// 得到排序序列(中序遍历)

	}, {
		key: "orderTraversal",
		value: function orderTraversal() {
			var str = (0, _st_util.BaseOrderTraversal)(this.root);
			return str.substr(0, str.length - 1);
		}
		// 删除节点

	}, {
		key: "delete",
		value: function _delete(key) {
			if (key == null || this.get(key) === undefined) return void 0;
			this.root = Delete(this.root, key);
		}
	}]);
	return BinarySearchTree;
}();

function Delete(current, key) {
	if (current.key < key) {
		current.right = Delete(current.right, key);
	} else if (current.key > key) {
		current.left = Delete(current.left, key);
	} else {
		if (current.left === null) return current.right;
		if (current.right === null) return current.left;
		var temp = current;
		current = getMin(current.right);
		current.right = DeleteMin(temp.right);
		current.left = temp.left;
	}
	return current;
}
function InsertNode(current, key, value) {
	if (current === null) return Node(key, value);
	if (current.key === key) {
		current.value = value;
	} else if (current.key < key) {
		current.right = InsertNode(current.right, key, value);
	} else {
		current.left = InsertNode(current.left, key, value);
	}
	return current;
}
function DeleteMax(current) {
	if (current.right === null) return current.left;
	current.right = DeleteMax(current.right);
	return current;
}
function DeleteMin(current) {
	if (current.left === null) return current.right;
	current.left = DeleteMin(current.left);
	return current;
}
function GetCelling(current, key) {
	if (current === null) return void 0;
	if (current.key === key) {
		return current;
	} else if (current.key < key) {
		return GetCelling(current.right, key);
	} else {
		return GetCelling(current.left, key) || current;
	}
}
function GetFloor(current, key) {
	if (current === null) return void 0;
	if (current.key === key) {
		return current;
	} else if (current.key > key) {
		return GetFloor(current.left, key);
	} else {
		return GetFloor(current.right, key) || current;
	}
}
exports.default = BinarySearchTree;