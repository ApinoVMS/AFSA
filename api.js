var express    = require('express'),
    Bourne     = require('bourne'),
    bodyParser = require('body-parser'),

    db         = new Bourne('data.json'),
    router     = express.Router();

router
    .use(bodyParser.json())
    .route('/contact')
        .get(function (req, res) {
            try{
                db.find({  }, function (err, data) {
                    if (err) console.log("db.find: "+err.message);
                    res.json(data);
                });
            }catch(e){
                console.log("route(/contact).get( ):"+ e.message);
            }
        })
        .post(function (req, res) {
            var contact = req.body;
            contact.userId = req.user.id;

            db.insert(contact, function (err, data) {
                res.json(data);
            });
        });

router
    .param('id', function (req, res, next) {
        
        req.dbQuery = { id: parseInt(req.params.id, 10) };
        console.log("req.dbQuery=");
        console.log(req.dbQuery);
        next();
    })
    .route('/contact/:id')
        .get(function (req, res) {
            console.log("db.findOne");
            console.log(req.dbQuery);
            db.findOne(req.dbQuery, function (err, data) {
                if (err) console.log(err.message);
                console.log(data);
                res.json(data);    
            });
            
        
        })
        .put(function (req, res) {
            var contact = req.body;
            delete contact.$promise;
            delete contact.$resolved;
            db.update(req.dbQuery, contact, function (err, data) {
                res.json(data[0]);
            });
        })
        .delete(function (req, res) {
            db.delete(req.dbQuery, function () {
                res.json(null);
            });
        });

module.exports = router;
