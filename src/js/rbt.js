import {
	getValue, 
	getMaxNode, 
	getMinNode,
	BaseOrderTraversal,
	findPos,
	BaseRotate
} from "./st_util";
class RBTNode{
	constructor (key, value) {
		this.key = key;
		this.value = value;
		this.isRed = true;   // 节点颜色,只有红色和黑色	
		this.left = null;
		this.right = null;
		this.parent = null;
	}
}
function Node (key, value) {
	return new RBTNode(key, value);
}
class RBTree{
	constructor () {
		this.root = null;
		this.length = 0;
		this.order = "";	
	}
	get (key) {
		return getValue(this.root, key);
	}
	insert (key, value) {
		if (key == null || value == null)
			throw new Error("参数传入有误");
		if (this.root === null) {
			this.root = new RBTNode(key, value);
			this.root.isRed = false;
			this.length++;
		}
		const newNode = new Node(key, value);
		findPos(this.root, newNode);
		if (newNode.parent != null) {
			this.length++;
			// 查看是否满足红黑树的原则
			this.AdjustNewRed(newNode);
		}
	}
	AdjustNewRed (node) {
		const parent = node.parent;
		// 为根节点,根节点必须为黑色
		if (parent === null) {  
			return node.isRed = false;
		}
		// 父节点为黑色,不会出现两个相连的红色节点
		if (!parent.isRed) return void 0;
		// 查找叔父节点,根据叔父颜色执行不同操作
		const uncle = getBortherNode(parent),
			grand = parent.parent;
		// 不存在的节点默认为黑色
		if (uncle && uncle.isRed) { 
			uncle.isRed = parent.isRed = false;
			grand.isRed = true;
			// 递归改变叔父为红的情况
			this.AdjustNewRed(grand);
		} else {
			if (parent === grand.left) 
				this.RightRotateForNewRed(node, parent, grand);
			else
				this.LeftRotateForNewRed(node, parent, grand);
		}
	}
	RightRotateForNewRed (node, parent, grand) {
		// 左-右:先进行左旋再进行右旋
		// 左-左:直接进行右旋
		if (node === parent.right) { 
			this.LeftRotate(node, parent);
			parent = node;
		}
		this.RightRotate(parent, grand);
		ReverseColor(parent, grand);
	}
	LeftRotateForNewRed (node, parent, grand) {
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
	RightRotate (node, parent) {
		BaseRotate.call(this, node, parent, 1);
	}
	// 左旋,右孩子变为根节点
	LeftRotate (node, parent) {
		BaseRotate.call(this, node, parent, 0);
	}
	orderTraversal () {
		var str = BaseOrderTraversal(this.root);
		return str.substr(0, str.length - 1);
	}
}
function getBortherNode (node) {
	const parent = node.parent;
	return node === parent.left ? parent.right : parent.left;
}
function ReverseColor (parent, grand) {
	grand.isRed = !grand.isRed;
	parent.isRed = !parent.isRed;
}
export default RBTree;