const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const checkAuth = require('../middleware/checkAuth');
const Person = require('../models/person');

router.get('/', checkAuth, (req, res, next) => {
    Person.find()
    .exec()
    .then(docs => {
        res.status(200).json({
            records : docs
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

router.post('/', checkAuth, (req, res, next) => {
    const person = new Person({
        _id : mongoose.Types.ObjectId(),
        name : req.body.name
    });
    person.save()
    .then(result => {
        res.status(200).json({
            message: "Successfully added a person",
            _id: result._id
        });
    })
    .catch(err => {
        res.status(500).json({
            error : err
        });
    });
});

router.get('/:personID', checkAuth, (req, res, next) => {
    Person.find({ _id : req.body.personId})
    .exec()
    .then(person => {
        if(person.length < 1){
            return res.status(404).json({
                message: "Not Found"
            });
        }
        res.status(200).json(person);
    })
    .catch(err => {
        res.status(500).json({
            error : err
        });
    });
});

router.patch('/:personId', (req, res, next) => {
    const id = req.params.personId;
    const updateOps = {};
    for(const ops of req.body.fields){
        updateOps[ops.propName] = ops.value;
    }
    Person.updateOne({_id:id},{$set: updateOps})
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Updated Successfully"
            });
        })
        .catch(err => {
            res.status(500).json({error : err});
        });
});

router.delete('/:personId', (req, res, next) => {
    const id = req.params.personId;
    Person.remove({_id:id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Deleted Successfully"
            });
        })
        .catch(err => {
            res.status(500).json({ error : err});
        });
});

module.exports = router;