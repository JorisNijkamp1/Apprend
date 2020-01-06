const mongoose = require('mongoose');

//Create schema
const columnSchema = new mongoose.Schema({
    type: {
        type: String
    },
    value: {
        type: String
    },
    path: {
        type: String
    },
    source: {
        type: String
    }
});

columnSchema.methods.editColumn = async function(change){
    this[change.prop] = change.value
    return this[change.prop]
}

//Create model
mongoose.model("Column", columnSchema);

module.exports = columnSchema;
