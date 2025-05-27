const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const userSchema = new Schema({
    full_name: {
        type: String,
        required: true
    },
    // userId: { 
    //     type: Number,
    //     unique: true
    // },
    rank: {
        type: Number,
        default: 0
    },
    total_points: {
        type: Number,
        default: 0 
    }
});
userSchema.set('timestamps', true);

module.exports = mongoose.model('user_schema', userSchema);