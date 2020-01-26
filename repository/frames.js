'use strict';
const fs = require('fs');

const file_name = './data.json';

const writeFrames = (frames) => {
    return new Promise((resolve, reject) => {
        try {
            fs.writeFile(file_name, JSON.stringify(frames), err => {
                if (err) {
                    reject(new Error(err));
                } else {
                    resolve();
                }
            });     
        } catch (err) {
            throw new Error(err);
            reject(err);
        };
    })
}

const getFrames = () => {
    return new Promise((resolve, reject) => {
        try {
            fs.readFile(file_name, (err, content) => {
                if (err) {
                    reject(new Error(err));
                } else {
                    resolve(JSON.parse(content));
                }
            });     
        } catch (err) {
            throw new Error(err);
        };
    })
}


module.exports = function() {
    return {
        writeFrames,
        getFrames,
    };
}