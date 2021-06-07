import axios from 'axios'
import React, { useEffect, useState } from 'react'

export function Comments() {
    const [commentsList, setCommentsList] = useState([])

    useEffect(() => {
        getComments()
    }, [])

    async function getComments() {
        const res = await axios.get('https://jsonplaceholder.typicode.com/posts/9/comments')
        const comments = res.data
        setCommentsList(comments)
    }

    return (
        <div>
            {commentsList?.map((comment, idx) => {
                return (
                    <div className="flex" key={idx}>

                        <p>{comment.body}</p>
                        <p>{comment.email}</p>
                    </div>
                )
            })}
        </div>
    )
}
