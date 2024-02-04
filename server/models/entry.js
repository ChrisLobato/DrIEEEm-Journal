const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DreamSchema = new Schema (
    {
        Text: { type: String , required: true},
        Date: { type: Date , default: Date.now},
        Hours: {type: Number, default: 0},
        //Feelings: { type: }
       // UpVotes: 
       // Comment: 

    },
    {timestamps: true},
)

module.exports = mongoose.model('Dream', DreamSchema);