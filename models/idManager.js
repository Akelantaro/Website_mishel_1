const mongoose = require('mongoose');

const idManagerSchema = mongoose.Schema({
    id: {type: Number},
    traceID: {type: Number}
});

const idManager = module.exports = mongoose.model('idManager'/*имя таблицы в бд*/, idManagerSchema);

module.exports.checkIdManager = function(newIdManager, callback){
    idManager.findOne().then(function (result){
        if (!result){
            newIdManager.save().then(function (result) {
                callback(null, result);
            }).catch(function (err) {
                callback(err, null);
            });
        } else callback(null, result);
    }).catch(function (err) {
        callback(err, null);
    });
}

module.exports.createIdManager = function (newIdManager, callback) {
    newIdManager.save().then(function (result) {
        callback(null, result);
    }).catch(function (err) {
        callback(err, null);
    });
}

module.exports.GetID = function (name, callback){
    idManager.findOne().then(function (result){
        if (name == "id"){ 
            idManager.findOneAndUpdate({},{id:result.id + 1}).then(function(result){
                callback(null, result); 
            }).catch(function (err) {
                callback(err, null);
            });
        }
        else if (name == "traceID"){ 
            idManager.findOneAndUpdate({},{traceID:result.traceID + 1}).then(function(result){
                callback(null, result); 
            }).catch(function (err) {
                callback(err, null);
            });
        }
        else callback(null, result)
    }).catch(function (err) {
        callback(err, null);
    });
}

module.exports.changeIdManeger = function (newIDmanager, callback){
    idManager.findOneAndUpdate({},newIDmanager).then(function(result){
        callback(null, result); 
    }).catch(function (err) {
        callback(err, null);
    });
}