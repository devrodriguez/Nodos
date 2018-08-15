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
    return res.json(req.body.user)
});

module.exports = router;