module.exports = (request, callback) => {
    const FORM_URLENCODED = 'application/x-www-form-urlencoded';
    let body = '';
    request.on('data', chunk => {
        body += chunk.toString();
    });
    request.on('end', () => {
        callback(body);
    });
}