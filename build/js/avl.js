"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AVLNode = function AVLNode(key, value) {
	(0, _classCallCheck3.default)(this, AVLNode);

	this.left = null;
	this.right = null;
	this.parent = null;
	this.key = key;
	this.value = value;
	this.bf = 0; // 平衡因子
};

function Node(key, value) {
	return new AVLNode(key, value);
}

var AVLTree = function () {
	function AVLTree() {
		(0, _classCallCheck3.default)(this, AVLTree);

		this.root = null;
		this.length = 0;
	}

	(0, _createClass3.default)(AVLTree, [{
		key: "get",
		value: function get(key) {
			return getValue(this.root, key);
		}
		// 插入节点时需要根据平衡因子对树进行重组,防止树的高度差过大

	}, {
		key: "insert",
		value: function insert(key, value) {
			if (key == null || value == null) throw new Error("参数传入有误");
			if (this.root === null) {
				this.root = Node(key, value);
				this.length++;
				return void 0;
			}
			var newNode = Node(key, value);
			findPos(this.root, newNode);
			if (newNode.parent !== null) this.length++;
			// 检查和对树进行整理
			this.Adjust(newNode);
		}
	}, {
		key: "PCRotate",
		value: function PCRotate(node, parent) {
			var grand = parent.parent;
			node.parent = grand;
			parent.parent = node;
			if (grand === null) {
				this.root = node;
			} else if (parent === grand.left) {
				grand.left = node;
			} else {
				grand.right = node;
			}
		}
		// 右旋,左孩子变为根节点

	}, {
		key: "RightRotate",
		value: function RightRotate(node, parent) {
			BaseRotate.call(this, node, parent, 1);
		}
		// 左旋,右孩子变为根节点

	}, {
		key: "LeftRotate",
		value: function LeftRotate(node, parent) {
			BaseRotate.call(this, node, parent, 0);
		}
	}, {
		key: "AdjustInsert",
		value: function AdjustInsert(node) {
			if (node.bf > 1) {
				this.BalanceRightRotate(node);
			} else if (node.bf < -1) {
				this.BalanceLeftRotate(node);
			} else {
				this.Adjust(node);
			}
		}
		// 插入节点时,左子树增加,平衡因子增加

	}, {
		key: "Adjust",
		value: function Adjust(node) {
			var parent = node.parent;
			if (parent !== null) {
				if (node === parent.left) {
					parent.bf++;
				} else {
					parent.bf--;
				}
				if (parent.bf !== 0) this.AdjustInsert(parent);
			}
		}
	}, {
		key: "BalanceRightRotate",
		value: function BalanceRightRotate(node) {
			var child = node.left;
			// 异号时,需要先进行左旋
			if (child.bf < 0) {
				var grand = child.right;
				this.LeftRotate(child, grand);
				if (grand.bf > 0) {
					grand.bf = 2;
					child.bf = 0;
				} else {
					var temp = grand.bf;
					grand.bf = -1 * child.bf;
					child.bf = -1 * temp;
				}
				child = grand;
			}
			this.RightRotate(child, node);
			node.bf = -1 * child.bf + 1;
			child.bf = child.bf > 1 ? 0 : child.bf - 1;
		}
	}, {
		key: "BalanceLeftRotate",
		value: function BalanceLeftRotate(node) {
			var child = node.right;
			if (child.bf > 0) {
				var grand = child.left;
				this.RightRotate(grand, child);
				if (grand.bf < 0) {
					grand.bf = -2;
					child.bf = 0;
				} else {
					var temp = grand.bf;
					grand.bf = -1 * child.bf;
					child.bf = -1 * temp;
				}
				child = grand;
			}
			this.LeftRotate(child, node);
			node.bf = -1 * child.bf - 1;
			child.bf = child.bf < -1 ? 0 : child.bf + 1;
		}
	}, {
		key: "delete",
		value: function _delete(key) {
			if (key == null) throw new Error("参数传入有误");
			var current = this.root;
			while (current !== null) {
				if (current.key === key) {
					var node = current;
					if (current.left !== null) node = getMaxNode(current.left);else if (current.right !== null) node = getMinNode(current.right);
					current.key = node.key;
					current.value = node.value;
					this.remove(node);
					this.length--;
					break;
				} else if (current.key > key) {
					current = current.left;
				} else {
					current = current.right;
				}
			}
		}
	}, {
		key: "remove",
		value: function remove(node) {
			// 这时树只有一个root节点
			if (node === this.root) {
				this.root = null;
				return void 0;
			}
			var parent = node.parent;
			if (node === parent.left) {
				parent.left = node.left;
				if (node.left !== null) {
					node.left.parent = parent;
				}
				parent.bf--;
			} else {
				parent.right = node.right;
				if (node.right !== null) {
					node.right.parent = parent;
				}
				parent.bf++;
			}
			// 不为1,说明树的高度发生了变化,需要整理
			// |bf| > 1,进行旋转, bf = 0,向上查看
			if (Math.abs(parent.bf) !== 1) {
				this.AdjustRemove(parent);
			}
		}
	}, {
		key: "AdjustRemove",
		value: function AdjustRemove(node) {
			if (node.bf > 1) {
				this.BalanceRightRotate(node);
			} else if (node.bf < -1) {
				this.BalanceLeftRotate(node);
			}
			var parent = node.parent;
			if (node.bf === 0 && parent !== null) {
				// 删除时与插入正好相反
				if (node === parent.left) {
					parent.bf--;
				} else {
					parent.bf++;
				}
				if (Math.abs(parent.bf) !== 1) {
					this.AdjustRemove(parent);
				}
			}
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
	}]);
	return AVLTree;
}();

var childName = ["left", "right"],
    childNameLength = childName.length - 1;
function getMaxNode(node) {
	if (node.right === null) return node;
	return getMaxNode(node.right);
}
function getMinNode(node) {
	if (node.left === null) return node;
	return getMinNode(node.left);
}
function BaseRotate(node, parent, index) {
	var type = childName[index];
	this.PCRotate(node, parent);
	parent[childName[childNameLength - index]] = node[type];
	// 右旋情况下,找寻未来根节点的右孩子,将其置为原来根节点的左孩子
	// 左旋情况下则反之
	node[type] && (node[type].parent = parent);
	node[type] = parent;
}
function findPos(current, node) {
	if (node.key === current.key) {
		current.value = node.value;
	} else if (node.key > current.key) {
		if (current.right == null) {
			current.right = node;
			node.parent = current;
		} else {
			findPos(current.right, node);
		}
	} else if (node.key < current.key) {
		if (current.left == null) {
			current.left = node;
			node.parent = current;
		} else {
			findPos(current.left, node);
		}
	}
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
exports.default = AVLTree;