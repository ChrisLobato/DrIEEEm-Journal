const mongoose = require('mongoose')
const Schema = mongoose.Schema

// the main journal schema
// it stores everything that we need dreams are its own document type that is defined
// 

const JournalSchema = new Schema(
    {
        username: { type: String , required: true},
        title: { type: String, required: true},
        description: {type:String, required: true},
        dreams: [{type: Schema.Types.ObjectId, ref: 'Dream'}],
        dateCreated: { type: Date, default: Date.now},
        views: { type: Number, default: 0},
        language: {type: String, default: "English"}
    },
    {timestamps: true},
)

module.exports = mongoose.model('Journal', JournalSchema);
