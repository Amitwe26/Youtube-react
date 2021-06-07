import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { SelectedVideo } from '../cmps/SelectedVideo';
import { VideoList } from '../cmps/VideoList';
import { videoService } from '../services/videoService';
import { saveVideo, setVideo, setVideosList, updateFavorites } from '../actions/ListAction'
import { storageService } from '../services/storageService';

export function Play() {
    const dispatch = useDispatch()
    const { video, list, favorites } = useSelector(state => state.listModule)

    useEffect(() => {
        const loadFromSession = storageService.loadSession('lastVideo')
        const keyword = storageService.loadFromStorage('keyword')

        async function getFavorites() {
            // const favoritesVideos = await videoService.queryFavorites()
            // dispatch(updateFavorites(favoritesVideos))

        }
        if (loadFromSession) {
            setVideo(loadFromSession)
            dispatch(setVideosList(keyword))
            getFavorites()
        }
    }, [dispatch, video])



    const setCurrVideo = (video) => {
        dispatch(setVideo(video))
        storageService.saveSession('lastVideo', video)

    }

    const saveToFavorites = (video) => {
        const newFavoritesList = videoService.chackIsFavorites(favorites, video)
        if (newFavoritesList) {
            const newList = videoService.deleteFromFavorites(favorites, video.id)
            dispatch(updateFavorites(newList, video))
        } else {
            const newVideo = video
            dispatch(saveVideo(newVideo))
        }
    }


    return (
        <div className="video-app flex">
            <SelectedVideo video={video} saveToFavorites={saveToFavorites} />
            <VideoList list={list} setCurrVideo={setCurrVideo} />
        </div>
    )
}
