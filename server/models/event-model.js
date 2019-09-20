const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Event = new Schema(
    {
        name: {type: String, required: true},
        description: {type:String, required: true},
        date: {type: String, required: true},
        time: {type: [String], required: true},
        userID: {type:String, required: true},
        organizator: {type:String, required: true},

    },
    {timestamps: true}
)


//module.exports = mongoose.model('users', Movie)
module.exports = mongoose.model('events', Event)  //Added to test. Here looks like i send the needed collection
