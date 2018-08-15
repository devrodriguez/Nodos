var express = require('express');
var router = express.Router();
var nodeModule = require('../../models/node');

router.get('/showall', function(req, res, next) {
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
});

module.exports = router;