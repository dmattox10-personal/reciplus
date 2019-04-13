const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EntrySchema = new Schema({
    _id: Schema.Types.ObjectId,
    title: {
        type: String,
        required: true
    },
    ingredients: {
        type: Array,
        required: true
    },
    instructions: {
        type: Array,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Entry = mongoose.model('entries', EntrySchema);

module.exports = Entry;