const mongoose = require('mongoose');

const SpanSchema = mongoose.Schema({
    req: {}
});

const Spans = module.exports = mongoose.model('spans'/*имя таблицы в бд*/, SpanSchema);

module.exports.RecordSpan = function (newSpan, callback) {
    newSpan.save().then(function (result) {
        callback(null, result);
    }).catch(function (err) {
        callback(err, null);
    });
}

module.exports.GetSpan = function (id, callback){
    Spans.findById(id).then(function (result){
        callback(null, result);
    }).catch(function (err) {
        callback(err, null);
    });
}