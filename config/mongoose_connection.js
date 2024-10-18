const mongoose = require('mongoose');
const dbgr = require('debug')('development:moongoose');
const config = require('config');

mongoose
    .connect(`${config.get("MONGODB_URI")}/college-project`)
    .then(() => {
        dbgr('Connected to MongoDB');
    })
    .catch((err) => {
        dbgr(err);
    })

module.exports = mongoose.connection;