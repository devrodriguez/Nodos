var express = require('express');
var router = express.Router();
var nodeModel = require('../../models/node');

router.get('/ancestor', function(req, res, next) {
    return res.json({});
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

    if(index >= branch.length) {
        return;
    }    

    if(node.right != null) {
        if(node.right.value == branch[index]) {
            if(node.right.left != null) {
                index++;
                BuildTreeNodes(node.right.left, branch, index);
            }
            else
            {
                index++;
                node.right.left = new nodeModel(branch[index], null, null);
                index++;
                BuildTreeNodes(node.right.left, branch, index);
            }
        }
        else
        {
            if(index > 1)
                index++;

            node.left = new nodeModel(branch[index], null, null);
            index++;
            BuildTreeNodes(node.left, branch, index);
        }
    }
    else
    {
        node.right = new nodeModel(branch[index], null, null);
        index++;
        BuildTreeNodes(node.right, branch, index);
    }
}

module.exports = router;