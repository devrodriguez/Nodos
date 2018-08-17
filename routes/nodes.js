var express = require('express');
var path = require('path');
var router = express.Router();

router.get('/view', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../views/nodes.html'));
});

module.exports = router;