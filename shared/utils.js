const mongoose = require('mongoose');

function mongoValidId(id) {
    return mongoose.Types.ObjectId.isValid(id);
}

module.exports.mongoValidId = mongoValidId;