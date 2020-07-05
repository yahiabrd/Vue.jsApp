var mongoose = require('mongoose')

var citySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})

module.exports =  mongoose.model('city', citySchema)