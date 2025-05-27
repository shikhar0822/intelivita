const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const activitySchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        default: null
    },
    points: { 
        type: Number,
        default: 20 
    }
});
activitySchema.set('timestamps', true);

module.exports = mongoose.model('activity_schema', activitySchema);