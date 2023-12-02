const express = require('express');
const router = express.Router();
const Span = require('../models/spans');

router.post('/recordspan', (req, res) => {
    let newSpan = new Span({
        name: "Helloworld",
        id: 1,
        timeStart: 0,
        timeEnd: 100
    });
    Span.RecordSpan(newSpan,(err, check) =>{
        if (err) console.log(err);
        if (check) console.log("success");
    })
});

module.exports = router;