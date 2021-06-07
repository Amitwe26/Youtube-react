const fs = require('fs')
const gHistory = require('../data/history.json')

module.exports = {
    query,
    _saveVideosToFile
}
function query() {
    const history = gHistory
    try {
        return Promise.resolve(history)
    } catch (err) {
        console.log('error to query history list is:', err);
    }
}
function _saveVideosToFile() {
    fs.writeFileSync('data/history.json', JSON.stringify(gHistory, null, 2))
}