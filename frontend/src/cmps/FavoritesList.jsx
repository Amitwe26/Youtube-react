import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteVideo, setVideo, updateFavorites } from '../actions/ListAction'
import { videoService } from '../services/videoService'
import { FavoritePreview } from './FavoritePreview'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { FavoritesFilter } from './FavoritesFilter'


export function FavoritesList() {
    const { favorites } = useSelector(state => state.listModule)
    const [list, setlist] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        loadFavorites()
    }, [favorites])


    async function loadFavorites(filterBy) {
        // if (!favorites) {
        //     const listFromStorge = await storageService.loadFromStorage('favoritesList')
        //     console.log('listFromStorge is:', listFromStorge);
        //     setlist(listFromStorge)
        // } else {
        const favorites = await videoService.queryFavorites(filterBy)

        setlist(favorites)
        // }

    }

    function setCurrVideo(ev, video) {
        console.log('video is:', video);
        ev.stopPropagation()
        dispatch(setVideo(video))
    }

    const deleteFromList = (ev, video) => {
        ev.stopPropagation()
        dispatch(deleteVideo(video))
        const newList = videoService.deleteFromFavorites(list, video.id)
        setlist(newList)
    }

    const handleDragEnd = res => {
        const { destination, source, type } = res
        const updateList = { ...list }
        if (!destination) return;
        if (type === 'favorite') {
            const from = source.index
            const to = destination.index
            const newList = _reorder(updateList, from, to)
            setlist(newList);
            console.log('newList ko and list is:', newList, list);
            dispatch(updateFavorites(newList))
        }
    }

    const _reorder = (updateList, sourceIdx, destIdx) => {
        const favoritesList = {}
        favoritesList.id = updateList.id
        favoritesList.list = Array.from(updateList.list);
        const [removedItem] = favoritesList.list.splice(sourceIdx, 1);
        favoritesList.list.splice(destIdx, 0, removedItem);

        return favoritesList;
    }

    const onFilterList = async (filterBy) => {
        const newList = await videoService.queryFavorites(filterBy)
        setlist(newList)
    }

    return (
        <section className="container-favorites">
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="favorites" type="favorite">
                    {(provided) => (
                        <div className="favorites" {...provided.droppableProps} ref={provided.innerRef} >
                            <FavoritesFilter onFilterList={onFilterList} />
                            {list.list?.map((video, index) => {
                                return (
                                    <Draggable key={video.id.videoId} draggableId={video.id.videoId} index={index}>
                                        {(provided) => {
                                            return (
                                                <FavoritePreview
                                                    key={video.id.videoId}
                                                    provided={provided}
                                                    video={video}
                                                    deleteFromList={deleteFromList}
                                                    setCurrVideo={setCurrVideo} />
                                            )
                                        }}
                                    </Draggable>
                                )
                            })}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </section>
    )
}
