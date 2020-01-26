'use strict';
const game = require('./game');
const scores = require('./score');

module.exports = new Map([
    ['/game', game],
    ['/scores', scores]
])