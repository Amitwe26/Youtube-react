import React,{useEffect,useState} from 'react'
import { VideoPreview } from './VideoPreview';

export function VideoList({ list, setCurrVideo }) {
    const [scroll, setScroll] = useState(false)

    useEffect(() => {
        window.addEventListener('scroll', changeListStyle)
        return () => window.removeEventListener('scroll', changeListStyle)
    }, [])

    function changeListStyle() {
        if(window.scrollY>50) setScroll(true)
        else setScroll(false)
    }

    return (
        <div className={`video-list ${scroll?'big-list':''}`}>
            {list.map(video => {
                return <VideoPreview
                    video={video}
                    key={video.id.videoId}
                    setCurrVideo={setCurrVideo} />
            })}
        </div>
    )
}
