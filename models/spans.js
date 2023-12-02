const mongoose = require('mongoose');

const SpanSchema = mongoose.Schema({
    name: {type: String},
    id: {type: Number},
    timeStart: {type: Number},
    timeEnd: {type: Number}
});

const Program = module.exports = mongoose.model('spans'/*имя таблицы в бд*/, SpanSchema);

module.exports.RecordSpan = function (newSpan, callback) {
    newSpan.save().then(function (result) {
        callback(null, result);
    }).catch(function (err) {
        callback(err, null);
    });
}

module.exports.removeLogin = function (login, callback) {
    Program.findOneAndRemove({login: login}).then(function (result) {
        callback(null, result);
    }).catch(function (err) {
        callback(err, null);
    });
}