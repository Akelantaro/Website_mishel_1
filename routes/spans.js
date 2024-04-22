const express = require('express');
const router = express.Router();
const Span = require('../models/spans');

router.post('/recordspan', (req, res) => {
    console.log(req.body.length);
    for (i=0; i<req.body.length;i++){
        let newSpan = new Span({
            id: req.body[i].id,
            functionName: req.body[i].functionName,
            traceID: req.body[i].traceID,
            parentsID: req.body[i].parentsID,
            timeStart: req.body[i].timeStart,
            timeEnd: req.body[i].timeEnd
        });
        Span.RecordSpan(newSpan,(err, check) =>{    
            if (err) console.log(err);
            if (check) res.json({msg:"Запрос выполнен"});
        })
    }
});

router.get('/getspan', (req, res)=> {
    Span.GetSpan(req.body,(err, check)=>{
        if (err) console.log(err);
        if (check.length == 0) res.json("не найдено");
        else res.json(check);
    })
});

module.exports = router;