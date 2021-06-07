import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import logo from '../assets/img/logo.png'

export function NavBar({ loadVideos, toggleMenuBar }) {
    const history = useHistory()
    const [word, setWord] = useState({})

    function setKeyWordInput(value) {
        const keyWord = { txt: '' }
        keyWord.txt = value
        setWord(keyWord)
    }
    function submitKeyWord(ev) {
        ev.preventDefault();
        loadVideos(word.txt)
    }

    return (
        <div className="nav-bar ">
            <div className="flex">
                <button
                    onClick={() => toggleMenuBar()}
                    className="hambur">≡</button>
                <Link to="/"><img src={logo} alt="" /></Link>
            </div>
            <form className="form" onSubmit={(ev) => submitKeyWord(ev)}>
                <input type="search" placeholder="Search" onChange={(ev) => setKeyWordInput(ev.target.value)} />
                <button onClick={() => history.push('/play')}>🔍</button>
            </form>
            <div className="info">
                <div className="avatar">A</div>
            </div>

        </div>
    )
}
