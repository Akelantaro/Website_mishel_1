const express = require('express');
const router = express.Router();
const Span = require('../models/spans');

router.post('/recordspan', (req, res) => {
    console.log(req.body);
    let newSpan = new Span({
        req: req.body
    });
    Span.RecordSpan(newSpan,(err, check) =>{    
        if (err) console.log(err);
        if (check) res.json({msg:"Запрос выполнен"});
    })
});

router.get('/getspan', (req, res)=> {
    Span.GetSpan(req.body.id,(err, check)=>{
        if (err) console.log(err);
        if (check){
            console.log(check.req);
            res.json(check.req);
        } 
        else res.json("не найдено");
    })
});

module.exports = router;