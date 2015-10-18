var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', function (req, res, next) {
    res.send(JSON.stringify({
        message: 'Hello world!'
    }));
});

router.post('/', function (req, res, next) {
    var url = req.body.url;
    var phrase = req.body.phrase;
    var regexp = new RegExp(phrase);

    request(url, function (error, response, body) {
        if (error) throw error;

        var status = regexp.test(body);

        console.log(' > ' + url + ': ' + phrase + ' => ' + status);

        res.send(JSON.stringify({
            url: url,
            phrase: phrase,
            status: status
        }));
    });
});

module.exports = router;
