const express = require('express');
const router = express.Router();
const Span = require('../models/spans');
const idManager = require('../models/idManager');

router.post('/recordspan', (req, res) => {
    let newIDmanager = new idManager({
        id:1,
        traceID:1
    })
    idManager.checkIdManager(newIDmanager,(err, check)=>{
        if (err) console.log(err);
        if (check){
            let id = check.id;
            for (i=0; i<req.body.length;i++){
                let newSpan = new Span({
                    id: id,
                    functionName: req.body[i].name,
                    traceID: check.traceID,
                    parentsID: req.body[i].parentsID,
                    timeStart: req.body[i].timeStart,
                    timeEnd: req.body[i].timeEnd
                });
                Span.RecordSpan(newSpan,(err, check) =>{    
                    if (err) console.log(err);
                })
                id++;
            }
            idManager.changeIdManeger({id:id,traceID:check.traceID+1},(err,check=>{
                if (err) console.log(err);
                res.json({msg:"Запрос выполнен"});
            }))
        };
    })
});

router.get('/getspan', (req, res)=> {
    Span.GetSpan(req.body,(err, check)=>{
        if (err) console.log(err);
        if (check.length == 0) res.json("не найдено");
        else res.json(check);
    })
});

function getID(name){
    idManager.checkIdManager(1,(err, check)=>{
        if (err) console.log(err);
        if (!check){
            let newIDmanager = new idManager({
                id:1,
                traceID:1
            })
            idManager.createIdManager(newIDmanager,(err,check2)=>{
                if (err) console.log(err);
                if (check) console.log(check2);
            })
        };
    })
    idManager.GetID(name,(err, check)=>{
        if (err) console.log(err);
        if (check) {
            console.log(check.id);
            return check.id;
        }
    })
}

router.get('/getID', (req,res)=>{
    idManager.checkIdManager(1,(err, check)=>{
        if (err) console.log(err);
        if (!check){
            let newIDmanager = new idManager({
                id:1,
                traceID:1
            })
            idManager.createIdManager(newIDmanager,(err,check2)=>{
                if (err) console.log(err);
                if (check) console.log(check2);
            })
        };
    })
    idManager.GetID(req.body.name,(err, check)=>{
        if (err) console.log(err);
        if (check) console.log(check.id + " " + check.traceID); 
    })
    res.sendStatus(200);
})



module.exports = router;