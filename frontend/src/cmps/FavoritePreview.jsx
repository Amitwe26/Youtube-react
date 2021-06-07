import React from 'react'
import { useHistory } from 'react-router-dom'

export function FavoritePreview({ video, setCurrVideo, deleteFromList, provided }) {
    const history = useHistory()

    function playCurrVideo(ev, video) {
        setCurrVideo(ev, video)
        history.push('/play')
    }
    return (
        <div  >
            <div className="favorite-preview flex align-center" {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps}>
                <div className="video-img">
                    <img src={video.snippet.thumbnails.medium.url} alt="img-video" />
                </div>
                <div className="video-content flex column" >
                    <h4>{video.snippet.title}</h4>
                    <p>{video.snippet.description}</p>
                    <div className="btn-div">
                        <button className="play" onClick={(ev) => playCurrVideo(ev, video)}>Play</button>
                        <button className="delete" onClick={(ev) => deleteFromList(ev, video)}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
