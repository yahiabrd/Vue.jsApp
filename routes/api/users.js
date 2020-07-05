const express = require('express')
const mongoose = require('mongoose')
const user = require('../../models/userModel')
const city = require('../../models/cityModel')
const jwt = require('jsonwebtoken');

mongoose.connect('mongodb://localhost/weatherapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true 
});
const db = mongoose.connection;
db.once('open', function() {
  console.log("connected to the database")
});

const router = express.Router()

router.get('/', (req, res) => {
  user.find({}, function(err, data){
    if (data) {
      res.send(data)
    }
  })
})

router.get('/cities', (req, res) => {
  city.find({}, function(err, data){
    if (data) {
      res.send(data)
    }
  })
})

router.get('/cities/:email', (req, res) => {
  city.find({email: req.params.email}, function(err, data){
    if (data) {
      res.send(data)
    }
  })
})

router.post('/register', (req, res) => {
  user.findOne({ email: req.body.email }, function(err, data){
    if (!data) {
      if (req.body.firstname && req.body.lastname && req.body.email && req.body.password) {
        var newUser = new user({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          password: req.body.password
        })
        newUser.save()
        let token = jwt.sign(req.body.email, '123');
        //console.log(token)
        res.json(token)
        //res.status(201).send()
      }
      res.status(401).send()
    }
    res.status(401).send()
  })
})

router.post('/login', (req, res) => {
  user.findOne({ email: req.body.email }, (err, data) => {
    if (data) {
      if (req.body.password == data.password) {
        let token = jwt.sign(req.body.email, '123');
        //console.log(token)
        res.json(token)
        //res.status(201).send()
      }
      res.status(401).send()
    }
    res.status(401).send()
  })
})

router.post('/save', (req, res) => {
  city.findOne({ name: req.body.name }, (err, data) => {
    if (!data) {
      if (req.body.name) {
        var newCity = new city({
          name: req.body.name,
          email: req.body.email
        })
        newCity.save()
        let token = jwt.sign(req.body.name, '123');
        res.json(token)
      }
      res.status(401).send()
    }
    res.status(401).send()
  })
})

router.post('/deleteCity/:name', (req, res) => {
  city.deleteOne({ name: req.body.name }, (err, data) => {
    if (err) {
      console.log(err)
    } else {
      res.send(data);
    }
  })
})

module.exports = router;