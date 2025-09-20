class node {
    value;
    count = 1;
    left = null;
    right = null;
    balance_factor = 0;
    height = 0;
    constructor(value) {
        this.value = value;
    }
}
export default class avl_tree {
    size = 0;
    root = null;
    insert(value) {
        if (this.root == null) this.root = new node(value);
        else {
            this.root = this.insert0(value, this.root);
        }
    }
    insert0(value, crnt) {
        if (crnt == null) return crnt = new node(value);
        if (value > crnt.value) crnt.right = this.insert0(value, crnt.right);
        else crnt.left = this.insert0(value, crnt.left);
        this.fix_node(crnt);
        // this.fix_balance(crnt);
        let ret = this.balance(crnt);
        return ret;
    }

    get_successor(crnt) {
        if (crnt.left == null) {
            return crnt.value;
        }
        return this.get_successor(crnt.left);
    }
    remove(crnt) {
        if (crnt.left == null) return crnt.right;
        if (crnt.right == null) return crnt.left;
        let suc_value = this.get_successor(crnt.right);
        crnt.value = suc_value;
        crnt.right = this.erase0(suc_value, crnt.right);
        return crnt;
    }
    erase(value) {
        this.root = this.erase0(value, this.root);
    }
    erase0(value, crnt) {
        if (crnt == null) return crnt;
        if (value > crnt.value) crnt.right = this.erase0(value, crnt.right);
        else if (value < crnt.value) crnt.left = this.erase0(value, crnt.left);
        else {
            return this.remove(crnt);
        }
        this.fix_node(crnt);
        let ret = this.balance(crnt);
        return ret;
    }

    fix_node(crnt) {
        let left_height = crnt.left == null ? -1 : crnt.left.height;
        let right_height = crnt.right == null ? -1 : crnt.right.height;
        crnt.height = Math.max(left_height, right_height) + 1;
        crnt.balance_factor = Math.max(right_height - left_height);
    }

    left_rotate(crnt) {
        let top = crnt.right;
        let tmp = top.left;
        top.left = crnt;
        crnt.right = tmp;
        this.fix_node(top.left);
        this.fix_node(top);
        return top;
    }

    right_rotate(crnt) {
        let top = crnt.left;
        let tmp = top.right;
        top.right = crnt;
        crnt.left = tmp;
        this.fix_node(crnt);
        this.fix_node(top);
        return top;
    }

    balance(crnt) {
        if (crnt.balance_factor == -2) {
            if (crnt.left.balance_factor == -1) {
                return this.right_rotate(crnt);
            }
            else {

                crnt.left = this.left_rotate(crnt.left);
                return this.right_rotate(crnt);
            }
        }
        else if (crnt.balance_factor == 2) {
            if (crnt.right.balance_factor == 1) {
                return this.left_rotate(crnt);
            }
            else {
                crnt.right = this.right_rotate(crnt.right);
                return this.left_rotate(crnt);
            }
        }
        return crnt;
    }

    get(value) {
        return this.get0(value, this.root);
    }

    get0(value, crnt) {

        if (crnt == null || crnt.value == value) return crnt;
        if (value > crnt.value) return this.get0(value, crnt.right);
        else return this.get0(value, crnt.left);
    }

    inorder(crnt) {
        if (crnt == null) return;
        this.inorder(crnt.left);
        console.log(crnt.value);
        this.inorder(crnt.right);
    }
}