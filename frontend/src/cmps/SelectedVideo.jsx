import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import YouTube from 'react-youtube';
import { Comments } from './Comments';


export function SelectedVideo({ saveToFavorites }) {
    const { video, favorites } = useSelector(state => state.listModule)
    const [isFavorites, setIsFavorites] = useState()
    const opts = {
        height: '510px',
        width: '100%',
        playerVars: {
            autoplay: 1,
        },
    }

    const _onReady = (event) => {
    }

    useEffect(() => {
        if (video.favorite) setIsFavorites(true)
        else setIsFavorites(false)
    }, [favorites, isFavorites, video])

    function chackBeforSave() {
        saveToFavorites(video)
        setIsFavorites(!isFavorites)
    }

    const date = (video) => {

        if (video !== {}) {
            const date = video?.snippet?.publishTime || ''
            const onlyDate = date.split('T')
            const reverse = onlyDate[0]
            return reverse
        }
    }




    if (!video) return <div>Loading..</div>
    return (

        <div className="video-player">
            <YouTube videoId={video.id?.videoId} opts={opts} onReady={_onReady} />
            <div className="info">
                <h1>{video.snippet?.title}</h1>
                <p>{video.snippet?.description}</p>
                <p style={{ color: 'gray' }}>From: {date(video)}</p>
                <div className="options">
                    <span className="btn-option">...</span>
                    <button
                        className="star"
                        onClick={() => chackBeforSave(video)}>
                        <span className={isFavorites ? 'favorite' : ''}>☆</span>
                    </button>
                    <button className="btn-option">Share</button>
                    <button className="btn-option">Like ✓</button>
                    <button className="btn-option">Unlike ✘</button>
                </div>
            </div>
            <Comments />
        </div >

    )
}
