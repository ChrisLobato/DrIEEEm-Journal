const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema(
    {
        email: { type : String, required: true },
        username: { type: String, required: true },
        passwordHash: { type: String, required: true },
        journals: [{type: Schema.Types.ObjectId, ref: 'Journal'}]
    },
    { timestamps: true },
)

module.exports = mongoose.model('User', UserSchema)
