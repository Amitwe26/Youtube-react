import { storageService } from '../services/storageService'
import { videoService } from '../services/videoService'

const _setVideosList = (list) => ({ type: 'SET_LIST', list })
const _setVideo = (video) => ({ type: 'SET_VIDEO', video })
const _saveVideo = (video) => ({ type: 'SAVE_VIDEO', video })
const _deleteVideo = (video) => ({ type: 'REMOVE_VIDEO', video })
const _updateFavorites = (favorites) => ({ type: 'UPDATE_FAVORITES', favorites })

export function setVideosList(name) {
    return async (dispatch) => {
        const results = await videoService.query(name)
        const list = results.items
        dispatch(_setVideosList(list))
    }
}

export function setVideo(video) {
    return dispatch => {
        const keyWordOfVideo = video.snippet.title
        storageService.saveToStorage('keyword', keyWordOfVideo)
        dispatch(_setVideo(video))
    }
}

export function updateFavorites(favorites, video) {
    if (video) {
        deleteVideo(video)
        return dispatch => {
            try {
                dispatch(_updateFavorites(favorites))
            } catch (err) {
                console.log('err to update after delete is:', err);
            }
        }

    } else {
        return dispatch => {
            try {
                dispatch(_updateFavorites(favorites))
                videoService.updateFavoritesList(favorites)
            } catch (err) {
                console.log('err is:', err);
            }
        }
    }
}

export function saveVideo(video) {
    return async dispatch => {
        const videoToSave = await videoService.saveVideoToFavorites(video)
        dispatch(_saveVideo(videoToSave))
    }
}
export function deleteVideo(video) {
    return async (dispatch) => {
        const videoToDelete = await videoService.removeVideo(video)
        dispatch(_deleteVideo(videoToDelete))

    }
}

