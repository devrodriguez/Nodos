var express = require('express');
var router = express.Router();
var nodeModel = require('../../models/node');

router.get('/showall', function(req, res, next) {
<<<<<<< HEAD
    let node = new nodeModule();

    node.name = 'Node 1';
    node.value = '80';
    return res.json(node);
});

router.post('/create', function(req, res, next) {
    let treeData = req.body.treeData;
    let node1 = req.body.node1;
    let node2 = req.body.node2;
    let branchNode1 = {};
    let branchNode2 = {};

    
    branchNode1 = treeData.find(item => {
        return item.values.some(_item => _item == node1)
    });

    branchNode2 = treeData.find(item => {
        return item.values.some(_item => _item == node2)
    });    

    return res.json([branchNode1, branchNode2]);
=======
    let node1 = new nodeModel(2, 80, null, null);
    let node2 = new nodeModel(3, 70, null, null);
    let nodeRoot = new nodeModel(1, 1, node1, node2);
    return res.json(nodeRoot);
});

router.post('/create', function(req, res, next) {
    let treeNodes = req.body.treeData;
    let tree = new nodeModel(treeNodes[0][0], null, null);

    treeNodes.forEach(branch => {
        BuildTreeNodes(tree, branch, 1);
    });

    return res.json(tree)
>>>>>>> 54efd742f1c1c2e986baa115cc4911cf0adf64c3
});

function BuildTreeNodes(node, branch, index) {
    console.log(branch);

    if(index >= branch.length) {
        return;
    }    

    if(node.right == null){
        node.right = new nodeModel(branch[index], null, null);
        index++;
        BuildTreeNodes(node.right, branch, index);
    }
    else
    {
        if(node.right.value == branch[index]) {
            
            if(node.right.left == null) {
                index++;
                node.right.left = new nodeModel(branch[index], null, null);
            }
            index++;
            BuildTreeNodes(node.right.left, branch, index);
        }
        else
        {
            //index++;
            node.left = new nodeModel(branch[index], null, null);
            index++;
            BuildTreeNodes(node.left, branch, index);
        }
    }
}

module.exports = router;