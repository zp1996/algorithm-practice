"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

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
			return getValue(this.root, key);
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
			return getMax(this.root);
		}
		// 获取最小值

	}, {
		key: "min",
		value: function min() {
			if (this.root === null) return void 0;
			return getMin(this.root).value;
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
		// 获取排序(中序遍历)

	}, {
		key: "orderTraversal",
		value: function orderTraversal() {
			this.order = "";
			this.MinOrder(this.root);
			return this.order.substr(0, this.order.length - 1);
		}
	}, {
		key: "MinOrder",
		value: function MinOrder(current) {
			if (current === null) return void 0;
			this.MinOrder(current.left);
			this.order += current.key + ",";
			this.MinOrder(current.right);
		}
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
function getValue(current, key) {
	if (current === null) return void 0;
	if (current.key === key) {
		return current.value;
	} else if (current.key < key) {
		return getValue(current.right, key);
	} else {
		return getValue(current.left, key);
	}
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
function getMax(current) {
	if (current.right === null) return current.value;
	return getMax(current.right);
}
function getMin(current) {
	if (current.left === null) return current;
	return getMin(current.left);
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