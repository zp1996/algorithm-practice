import {
	getValue, 
	getMaxNode, 
	getMinNode,
	BaseOrderTraversal,
	findPos,
	BaseRotate,
	BaseDelete
} from "./st_util";
class AVLNode {
	constructor (key, value) {
		this.left = null;
		this.right = null;
		this.parent = null;
		this.key = key;
		this.value = value;
		this.bf = 0;   // 平衡因子
	}
}
function Node (key, value) {
	return new AVLNode(key, value);
}
class AVLTree {
	constructor () {
		this.root = null;
		this.length = 0;
	}
	get (key) {
		return getValue(this.root, key);
	}
	// 插入节点时需要根据平衡因子对树进行重组,防止树的高度差过大
	insert (key, value) {
		if (key == null || value == null)
			throw new Error("参数传入有误");
		if (this.root === null) {
			this.root = Node(key, value);
			this.length++;
			return void 0;
		}
		const newNode = Node(key, value);
		findPos(this.root, newNode);
		if (newNode.parent !== null)
			this.length++;
		// 检查和对树进行整理
		this.Adjust(newNode);
	}
	// 右旋,左孩子变为根节点
	RightRotate (node, parent) {
		BaseRotate.call(this, node, parent, 1);
	}
	// 左旋,右孩子变为根节点
	LeftRotate (node, parent) {
		BaseRotate.call(this, node, parent, 0);
	}
	AdjustInsert (node) {
		if (node.bf > 1) {
			this.BalanceRightRotate(node);
		} else if (node.bf < -1) {
			this.BalanceLeftRotate(node);
		} else {
			this.Adjust(node);
		}
	}
	// 插入节点时,左子树增加,平衡因子增加
	Adjust (node) {
		const parent = node.parent;
		if (parent !== null) {
			if (node === parent.left) {
				parent.bf++;
			} else {
				parent.bf--;
			}
			if (parent.bf !== 0) 
				this.AdjustInsert(parent);
		}
	}
	BalanceRightRotate (node) {
		var child = node.left;
		// 异号时,需要先进行左旋
		if (child.bf < 0) {
			const grand = child.right;
			this.LeftRotate(child, grand);
			if (grand.bf > 0) {
				grand.bf = 2;
				child.bf = 0;	
			} else {
				const temp = grand.bf;
				grand.bf = -1 * child.bf;
				child.bf = -1 * temp;
			}
			child = grand;
		}
		this.RightRotate(child, node);
		node.bf = -1 * child.bf + 1; 
		child.bf = child.bf > 1 ? 0 : child.bf - 1;
	}
	BalanceLeftRotate (node) {
		var child = node.right;
		if (child.bf > 0) {
			const grand = child.left;
			this.RightRotate(grand, child);
			if (grand.bf < 0) {
				grand.bf = -2;
				child.bf = 0;
			} else {
				const temp = grand.bf;
				grand.bf = -1 * child.bf;
				child.bf = -1 * temp;
			}
			child = grand;
		}
		this.LeftRotate(child, node);
		node.bf = -1 * child.bf - 1;
		child.bf = child.bf < -1 ? 0 : child.bf + 1;
	}
	delete (key) {
		BaseDelete.call(this, key);
	}
	remove (node) {
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
	AdjustRemove (node) {
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
	orderTraversal () {
		var str = BaseOrderTraversal(this.root);
		return str.substr(0, str.length - 1);
	}
}
export default AVLTree;