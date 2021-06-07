import axios from "axios";
import { storageService } from './storageService.js'

const VIDEOS_KEY = 'video'
const KEYWORD_KEY = 'keyword'
const FAVORITES_LIST = 'favoritesList'

const BASE_URL = 'http://localhost:3030/favorites';
export const videoService = {
    query,
    chackIsFavorites,
    historylist,
    deleteFromFavorites,
    queryFavorites,
    saveVideoToFavorites,
    removeVideo,
    updateFavoritesList
}

async function query(keyword) {
    console.log('keyword is:', keyword);
    // var storageKeyword = storageService.loadFromStorage(KEYWORD_KEY)
    // if (keyword === '' && !storageKeyword) keyword = 'Angular'

    // if (keyword === storageKeyword || keyword === '') {
    //     return storageService.loadFromStorage(VIDEOS_KEY)
    // }
    // var listFromStorge = storageService.loadFromStorage(keyword)

    // return listFromStorge
    const res = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=video&q=${keyword}&key=AIzaSyCKuaufnbpG6KWdX28y4gBz43wMxdjEa54`);
    const videos = res.data;
    storageService.saveToStorage(VIDEOS_KEY, videos)
    storageService.saveToStorage(KEYWORD_KEY, keyword)
    return videos;
}
async function queryFavorites(filterBy) {

    try {
        const res = await axios.get(BASE_URL);
        const favorites = res.data;
        if (filterBy) {
            const newFavorites = { id: favorites.id, list: [] }
            const filterRegex = new RegExp(filterBy.name, 'i');
            newFavorites.list = favorites.list.filter(favorite => filterRegex.test(favorite.snippet.title));

            storageService.saveToStorage(FAVORITES_LIST, newFavorites)
            return newFavorites
        }
        storageService.saveToStorage(FAVORITES_LIST, favorites)
        return favorites;
    } catch {
        console.log('soryyy i cant to query favorites');
    }

}
async function updateFavoritesList(favorites) {
    try {
        const res = await axios.put(`${BASE_URL}`, favorites)
        return res.data
    } catch (err) {
        console.log('err is:', err);
    }
}
function chackIsFavorites(favoritesList, videoToChack) {
    console.log('favortiesList is:', favoritesList, videoToChack);
    const isFavorites = favoritesList.list?.some(video => video.id.videoId === videoToChack.id?.videoId)
    if (isFavorites) return true
    else return false
}

async function saveVideoToFavorites(video) {
    video.favorite = true
    const res = await axios.post(BASE_URL, video);
    return res.data;
}

function deleteFromFavorites(favorites, videoId) {
    const idx = favorites.list.findIndex(video => video.id.videoId === videoId.videoId)
    favorites.list[idx].favorite = false
    favorites.list.splice(idx, 1)
    return favorites
}

async function removeVideo(video) {
    try {
        const res = await axios.delete(`${BASE_URL}/${video.id.videoId}`)
        return res.data
    }
    catch {
        console.log('soryyy');
    }
}

function historylist(history, video) {
    var copy = [...history]
    copy.push(video)
}

