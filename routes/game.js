'use strict';
const fs = require('fs');
const frames = require('../repository/frames')();

module.exports = async (req, res, body) => {

    if (req.method !== 'POST') {
        res.statusCode = 404;
        res.write(JSON.stringify({ message: "Method isn't defined"}));
        return;
    }

    try{
        await frames.writeFrames({frames: []});
        res.statusCode = 204;
        res.end();
    } catch (err) {
        res.statusCode = 500;
        res.write(JSON.stringify({ message: 'Something did wrong'}));
        res.end();  
    }

}