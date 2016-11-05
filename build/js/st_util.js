"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getValue = getValue;
exports.getMaxNode = getMaxNode;
exports.getMinNode = getMinNode;
exports.findPos = findPos;
exports.BaseDelete = BaseDelete;
exports.BaseRotate = BaseRotate;
exports.BaseOrderTraversal = BaseOrderTraversal;
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
function getMaxNode(node) {
	if (node.right === null) return node;
	return getMaxNode(node.right);
}
function getMinNode(node) {
	if (node.left === null) return node;
	return getMinNode(node.left);
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
function BaseDelete(key) {
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
// 将根节点与子树进行转换
function PCRotate(node, parent) {
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
var childName = ["left", "right"],
    childNameLength = childName.length - 1;
function BaseRotate(node, parent, index) {
	var type = childName[index];
	PCRotate.call(this, node, parent);
	// 右旋情况下,找寻未来根节点的右孩子,将其置为原来根节点的左孩子
	// 左旋情况下则反之
	parent[childName[childNameLength - index]] = node[type];
	node[type] && (node[type].parent = parent);
	node[type] = parent;
}
function BaseOrderTraversal(node) {
	var order = { str: "" };
	MinOrder(node, order);
	return order.str;
}
function MinOrder(current, order) {
	if (current === null) return void 0;
	MinOrder(current.left, order);
	order.str += current.key + ",";
	MinOrder(current.right, order);
}