var express = require('express');
var router = express.Router();
var nodeModel = require('../../models/node');

router.post('/ancestor', function(req, res, next) {
    
    // Get tree
    let tree = req.body.tree;
    let n1 = req.body.n1;
    let n2 = req.body.n2;
    let ancestor = null;

    ancestor = FindLCA(tree, n1, n2);

    return res.json({
        ancestor: ancestor.value
    });
});

router.post('/create', function(req, res, next) {
    let treeNodes = req.body;
    let tree = new nodeModel(treeNodes[0][0], null, null);

    treeNodes.forEach(branch => {
        BuildTreeNodes(tree, branch, 1);
    });

    return res.json(tree)
});

function FindLCA(node, a1, a2) {
    if(node == null)
        return null;

    if(node.value == a1 || node.value == a2)
        return node;

    let lfLca = FindLCA(node.left, a1, a2);
    let rgLca = FindLCA(node.right, a1, a2);

    if(lfLca != null && rgLca != null)
        return node;

    return (lfLca != null) ? lfLca : rgLca;
}

function BuildTreeNodes(node, branch, index) {
    if(index >= branch.length) {
        return;
    } 

    if(branch[index] > node.value) {
        if(node.right == null){
            node.right = new nodeModel(branch[index], null, null);
        }
        index++;
        BuildTreeNodes(node.right, branch, index)
    }
    else
    {
        if(node.left == null){
            node.left = new nodeModel(branch[index], null, null);
        }
        index++;
        BuildTreeNodes(node.left, branch, index)
    }
}

module.exports = router;