const mongoose = require('mongoose')
const entry = mongoose.entry

const JournalEntry = new entry (
    {
        Text: { type: String , required: true},
        Date: { type: Date , default: Date.now},
        Hours: {type: Number, default: 0},
        Location : {type: Location, default: navigator.geolocation},
        //Feelings: { type: }
       // UpVotes: 
       // Comment: 

    },
    {timestamps: true},
)

module.exports = mongoose.model('Dream', JournalEntry);