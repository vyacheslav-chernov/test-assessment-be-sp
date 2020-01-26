'use strict';
const framesRepository = require('../repository/frames')();
const bodyCollector = require('../tools/bodyCollector');

const getScores = (req, res, frames) => {
    const retFrames = {...frames, total: frames.frames.reduce((acc, frame) => acc + frame.first + frame.second, 0)};
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(retFrames));
    res.end();      
}
const isValidScore = val => {
    return !!val && Number(val)>0 && Number(val)<11;
}

const addFrame = async (req, res, frame, frames) => {
    if (!isValidScore(frame.first) || !isValidScore(frame.second)) {
        res.writeHead(400, {'Content-Type': 'application/json'});
        res.write(JSON.stringify({message: 'Invalid parameter'}));
        res.end();      
        return;    
    }
    const frameToWrite = {
        first: Number(frame.first),
        second: Number(frame.second)
    }
    frames.frames.push(frameToWrite);
    await framesRepository.writeFrames(frames);
    res.writeHead(204, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(frameToWrite));
    res.end();  
}


module.exports = async (req, res, body) => {
    
    if (req.method !== 'GET' && req.method !== 'PUT') {
        res.statusCode = 404;
        res.write(JSON.stringify({ message: "Method " + req.method + " isn't defined"}));
        res.end();
        return;
    }
    try{
        let frames = await framesRepository.getFrames();
        switch (req.method) {
            case 'GET': getScores(req, res, frames); break;
            case 'PUT': bodyCollector(req, body => {
                const frame = JSON.parse(body);
                addFrame(req, res, frame, frames);
            }); break;
        }
  
    } catch (err) {
        res.statusCode = 500;
        res.write(JSON.stringify({ message: 'Something did wrong'}));
        res.end();          
    }

}