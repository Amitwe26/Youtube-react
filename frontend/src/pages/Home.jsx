import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { videoService } from '../services/videoService'

export function Home() {
    const [favorites, setFavorites] = useState([])
    useEffect(() => {
        loadFavoritesList()
    }, [])

    async function loadFavoritesList() {
        const favoList = await videoService.queryFavorites()
        console.log('favoList is:', favoList);
        setFavorites(favoList)
    }
    return (
        <section className="home-page">
            <h1>Welcome Amit </h1>
            <h2>Favorite list for you</h2>
            <div className=" favo-list flex">
                {favorites.list?.map((video, idx) => {
                    return (
                        <div key={idx}
                            className="favorite-preview flex">
                            <img src={video.snippet.thumbnails.default.url} alt="img-video" />
                            <span>{video.snippet.title}</span>
                        </div>
                    )
                })}
            </div>
            <h2>History list for you </h2>
            <div>
                <p>list history</p>
            </div>
        </section>
    )
}
