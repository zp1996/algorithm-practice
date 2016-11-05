import {
	getValue, 
	getMaxNode, 
	getMinNode,
	BaseOrderTraversal,
	findPos,
	BaseRotate,
	BaseDelete
} from "./st_util";
const type = ["left", "right"],
	typeLen = type.length - 1,
	cache = {};
function Captialze (str) {
	return cache[str] 
		|| (cache[str] = str.charAt(0).toUpperCase() + str.slice(1));
}
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
	// 插入时主要考虑的是从根到叶子的路径不包含连续的红色节点
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
		console.log(node, parent);
		BaseRotate.call(this, node, parent, 1);
		console.log(this.root);
	}
	// 左旋,右孩子变为根节点
	LeftRotate (node, parent) {
		BaseRotate.call(this, node, parent, 0);
	}
	orderTraversal () {
		var str = BaseOrderTraversal(this.root);
		return str.substr(0, str.length - 1);
	}
	// 删除时,需要继续保持从根到叶子的路径黑色节点的总数相同
	delete (key) {
		BaseDelete.call(this, key);
	}
	remove (node) {
		if (node === this.root) {
			return this.root = null;
		}
		// node节点最多只能含有一个子节点
		const parent = node.parent,
			child = node.left || node.right,
			isLeft = node === parent.left;
		if (child) child.parent = parent;
		if (isLeft) {
			parent.left = child;
		} else {
			parent.right = child;
		}
		// 删除的节点是红色的,则不会影响路径上黑色节点的个数
		if (node.isRed)	return void 0;
		// 假若子节点是红色的,则变为黑色,这样就平衡了
		if (child && child.isRed) {
			child.isRed = false;
		} else {
			node = child;
			Adjust.call(this, node, parent, isLeft);
		}
	}
	AdjustLeftMissedBlack (node, parent, brother) {
		BaseAdjust.call(this, node, parent, brother, 0);
	}
	AdjustRightMissedBlack (node, parent, brother) {
		BaseAdjust.call(this, node, parent, brother, 1);
	}
	LeftRotateToAddBlack (node, parent, brother) {
		this.LeftRotate(brother, parent);
		brother.isRed = parent.isRed;
		brother.right.isRed = false;
		parent.isRed = false;
	}
	RightRotateToAddBlack (node, parent, brother) {
		this.RightRotate(brother, parent);
		brother.isRed = parent.isRed;
		brother.left.isRed = false;
		parent.isRed = false;
	}
}
function Adjust (node, parent, left) {
	const isLeft = left === void 0 ?
			node === parent.left : left,
		brother = isLeft
			? parent.right : parent.left;
	if (isLeft) {
		this.AdjustLeftMissedBlack(node, parent, brother);
	} else {
		this.AdjustRightMissedBlack(node, parent, brother);
	}
}
function BaseAdjust (node, parent, brother, index) {
	const dir = type[index],
		opDir = type[typeLen - index];
	if (brother.isRed) {
		this[`${Captialze(dir)}Rotate`](brother, parent);
		ReverseColor(brother, parent);
		brother = parent[opDir];
	}
	const oppChild = brother[dir],
		child = brother[opDir];
	// 兄弟节点是黑色且右子树是红色的=>情况4
	if (child && child.isRed) {
		this[`${Captialze(dir)}RotateToAddBlack`](node, parent, brother);
	} else if (oppChild && oppChild.isRed) {
		// 兄弟节点为黑色的,兄弟左为红,右为黑
		brother.isRed = true;
		oppChild.isRed = false;
		this[`${Captialze(opDir)}Rotate`](oppChild, brother);
		// 此时,兄为黑,兄右为红,成为了情况4
		this[`${Captialze(dir)}RotateToAddBlack`](node, parent, oppChild);
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
function getBortherNode (node) {
	const parent = node.parent;
	return node === parent.left ? parent.right : parent.left;
}
function ReverseColor (parent, grand) {
	grand.isRed = !grand.isRed;
	parent.isRed = !parent.isRed;
}
export default RBTree;