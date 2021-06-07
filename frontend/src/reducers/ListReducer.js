const initialState = {
    list: [],
    video: {},
    favorites: []
}

export default function ListReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_LIST':
            return {
                ...state,
                list: action.list
            }
        case 'SET_VIDEO':
            return {
                ...state,
                video: action.video
            }
        case 'SAVE_VIDEO':
            return {
                ...state,
                favorites: [action.video, ...state.favorites]
            }
        case 'REMOVE_VIDEO':
            return {
                ...state,
                favorites: state.list.filter(video => video.id.videoId !== action.videoId)
            };
        case 'UPDATE_FAVORITES':
            return {
                ...state,
                favorites: action.favorites.list
            }
        default: return state
    }

}