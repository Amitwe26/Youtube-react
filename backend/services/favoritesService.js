const fs = require('fs')
const gFavorites = require('../data/favorites.json')

module.exports = {
    query,
    saveVideo,
    deleteVideo,
    _saveVideosToFile,
    updateFavorites
}

function query() {
    const favortites = gFavorites
    try {

        return Promise.resolve(favortites)
    } catch (err) {
        console.log('error to query favorites is:', err);
    }
}

function deleteVideo(videoId) {
    const idx = gFavorites.list.findIndex(video => video.id.videoId === videoId);
    if (idx >= 0) {
        gFavorites.list.splice(idx, 1);
        _saveVideosToFile();
        return Promise.resolve();
    } else return Promise.reject('No video in favorites');
}
function updateFavorites(favoritesList) {
    gFavorites.list = favoritesList.list
    _saveVideosToFile()
    return Promise.resolve()
}
// function deleteFromFavorites(list, videoId) {
//     const idx = list.findIndex(video => video.id === videoId)
//     console.log('idx is:', idx);
//     list[idx].favorite = false
//     list.splice(idx, 1)
//     return list
// }
function saveVideo(video) {
    gFavorites.list.unshift(video)
    _saveVideosToFile()
    return Promise.resolve(video)
}

function _saveVideosToFile() {
    fs.writeFileSync('data/favorites.json', JSON.stringify(gFavorites, null, 2))
}