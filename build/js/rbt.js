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

var type = ["left", "right"],
    typeLen = type.length - 1,
    cache = {};
function Captialze(str) {
	return cache[str] || (cache[str] = str.charAt(0).toUpperCase() + str.slice(1));
}

var RBTNode = function RBTNode(key, value) {
	(0, _classCallCheck3.default)(this, RBTNode);

	this.key = key;
	this.value = value;
	this.isRed = true; // 节点颜色,只有红色和黑色	
	this.left = null;
	this.right = null;
	this.parent = null;
};

function Node(key, value) {
	return new RBTNode(key, value);
}

var RBTree = function () {
	function RBTree() {
		(0, _classCallCheck3.default)(this, RBTree);

		this.root = null;
		this.length = 0;
		this.order = "";
	}

	(0, _createClass3.default)(RBTree, [{
		key: "get",
		value: function get(key) {
			return (0, _st_util.getValue)(this.root, key);
		}
		// 插入时主要考虑的是从根到叶子的路径不包含连续的红色节点

	}, {
		key: "insert",
		value: function insert(key, value) {
			if (key == null || value == null) throw new Error("参数传入有误");
			if (this.root === null) {
				this.root = new RBTNode(key, value);
				this.root.isRed = false;
				this.length++;
			}
			var newNode = new Node(key, value);
			(0, _st_util.findPos)(this.root, newNode);
			if (newNode.parent != null) {
				this.length++;
				// 查看是否满足红黑树的原则
				this.AdjustNewRed(newNode);
			}
		}
	}, {
		key: "AdjustNewRed",
		value: function AdjustNewRed(node) {
			var parent = node.parent;
			// 为根节点,根节点必须为黑色
			if (parent === null) {
				return node.isRed = false;
			}
			// 父节点为黑色,不会出现两个相连的红色节点
			if (!parent.isRed) return void 0;
			// 查找叔父节点,根据叔父颜色执行不同操作
			var uncle = getBortherNode(parent),
			    grand = parent.parent;
			// 不存在的节点默认为黑色
			if (uncle && uncle.isRed) {
				uncle.isRed = parent.isRed = false;
				grand.isRed = true;
				// 递归改变叔父为红的情况
				this.AdjustNewRed(grand);
			} else {
				if (parent === grand.left) this.RightRotateForNewRed(node, parent, grand);else this.LeftRotateForNewRed(node, parent, grand);
			}
		}
	}, {
		key: "RightRotateForNewRed",
		value: function RightRotateForNewRed(node, parent, grand) {
			// 左-右:先进行左旋再进行右旋
			// 左-左:直接进行右旋
			if (node === parent.right) {
				this.LeftRotate(node, parent);
				parent = node;
			}
			this.RightRotate(parent, grand);
			ReverseColor(parent, grand);
		}
	}, {
		key: "LeftRotateForNewRed",
		value: function LeftRotateForNewRed(node, parent, grand) {
			// 右-左:先进行右旋再进行左旋
			// 右-右:直接进行左旋
			if (node === parent.left) {
				this.RightRotate(node, parent);
				parent = node;
			}
			this.LeftRotate(parent, grand);
			ReverseColor(parent, grand);
		}
		// 右旋,左孩子变为根节点

	}, {
		key: "RightRotate",
		value: function RightRotate(node, parent) {
			_st_util.BaseRotate.call(this, node, parent, 1);
		}
		// 左旋,右孩子变为根节点

	}, {
		key: "LeftRotate",
		value: function LeftRotate(node, parent) {
			_st_util.BaseRotate.call(this, node, parent, 0);
		}
	}, {
		key: "orderTraversal",
		value: function orderTraversal() {
			var str = (0, _st_util.BaseOrderTraversal)(this.root);
			return str.substr(0, str.length - 1);
		}
		// 删除时,需要继续保持从根到叶子的路径黑色节点的总数相同

	}, {
		key: "delete",
		value: function _delete(key) {
			_st_util.BaseDelete.call(this, key);
		}
	}, {
		key: "remove",
		value: function remove(node) {
			if (node === this.root) {
				return this.root = null;
			}
			// node节点最多只能含有一个子节点
			var parent = node.parent,
			    child = node.left || node.right,
			    isLeft = node === parent.left;
			if (child) child.parent = parent;
			if (isLeft) {
				parent.left = child;
			} else {
				parent.right = child;
			}
			// 删除的节点是红色的,则不会影响路径上黑色节点的个数
			if (node.isRed) return void 0;
			// 假若子节点是红色的,则变为黑色,这样就平衡了
			if (child && child.isRed) {
				child.isRed = false;
			} else {
				node = child;
				Adjust.call(this, node, parent, isLeft);
			}
		}
	}, {
		key: "AdjustLeftMissedBlack",
		value: function AdjustLeftMissedBlack(node, parent, brother) {
			BaseAdjust.call(this, node, parent, brother, 0);
		}
	}, {
		key: "AdjustRightMissedBlack",
		value: function AdjustRightMissedBlack(node, parent, brother) {
			BaseAdjust.call(this, node, parent, brother, 1);
		}
	}, {
		key: "LeftRotateToAddBlack",
		value: function LeftRotateToAddBlack(node, parent, brother) {
			this.LeftRotate(brother, parent);
			brother.isRed = parent.isRed;
			brother.right.isRed = false;
			parent.isRed = false;
		}
	}, {
		key: "RightRotateToAddBlack",
		value: function RightRotateToAddBlack(node, parent, brother) {
			this.RightRotate(brother, parent);
			brother.isRed = parent.isRed;
			brother.left.isRed = false;
			parent.isRed = false;
		}
	}]);
	return RBTree;
}();

function Adjust(node, parent, left) {
	var isLeft = left === void 0 ? node === parent.left : left,
	    brother = isLeft ? parent.right : parent.left;
	if (isLeft) {
		this.AdjustLeftMissedBlack(node, parent, brother);
	} else {
		this.AdjustRightMissedBlack(node, parent, brother);
	}
}
function BaseAdjust(node, parent, brother, index) {
	var dir = type[index],
	    opDir = type[typeLen - index];
	if (brother.isRed) {
		this[Captialze(dir) + "Rotate"](brother, parent);
		ReverseColor(brother, parent);
		brother = parent[opDir];
	}
	var oppChild = brother[dir],
	    child = brother[opDir];
	// 兄弟节点是黑色且右子树是红色的=>情况4
	if (child && child.isRed) {
		this[Captialze(dir) + "RotateToAddBlack"](node, parent, brother);
	} else if (oppChild && oppChild.isRed) {
		// 兄弟节点为黑色的,兄弟左为红,右为黑
		brother.isRed = true;
		oppChild.isRed = false;
		this[Captialze(opDir) + "Rotate"](oppChild, brother);
		// 此时,兄为黑,兄右为红,成为了情况4
		this[Captialze(dir) + "RotateToAddBlack"](node, parent, oppChild);
	} else {
		// 兄为黑,兄子均为黑(无子节点,也算黑)
		brother.isRed = true;
		if (parent.isRed) {
			parent.isRed = false;
		} else {
			node = parent;
			parent = node.parent;
			if (parent !== null) {
				Adjust.call(this, node, parent);
			}
		}
	}
}
function getBortherNode(node) {
	var parent = node.parent;
	return node === parent.left ? parent.right : parent.left;
}
function ReverseColor(parent, grand) {
	grand.isRed = !grand.isRed;
	parent.isRed = !parent.isRed;
}
exports.default = RBTree;