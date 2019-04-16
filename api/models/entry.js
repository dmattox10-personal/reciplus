const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EntrySchema = new Schema({
    _id: Schema.Types.ObjectId,
    title: {
        type: String,
        required: true
    },
    description: {
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
    tags: {
        type: Array
    },
    user: {
        type: String,
        required: true
    },
    photo: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Entry = mongoose.model('entries', EntrySchema);

module.exports = Entry;