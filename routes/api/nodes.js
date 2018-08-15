var express = require('express');
var router = express.Router();
var nodeModel = require('../../models/node');

router.get('/showall', function(req, res, next) {
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