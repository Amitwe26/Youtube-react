import { setVideosList } from '../actions/ListAction'
import { useState } from 'react';
import { NavBar } from '../cmps/NavBar';
import { useDispatch } from 'react-redux';
import { Toolbar } from '../cmps/Toolbar';
import { FavoritesList } from '../cmps/FavoritesList';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import { Home } from './Home'
import { Play } from './Play';

export function VideoApp() {
    const dispatch = useDispatch()
    const [menu, setMenu] = useState(false)

    function toggleMenuBar() {
        setMenu(!menu)

    }

    async function loadVideos(keyWord) {
        dispatch(setVideosList(keyWord))
    }

    return (
        <Router>
            <section>
                <NavBar
                    loadVideos={loadVideos}
                    toggleMenuBar={toggleMenuBar}
                />

                {menu && <Toolbar />}

                <Switch>
                    <Route path="/favorites" component={FavoritesList} />
                    <Route path="/" exact component={Home} />
                    <Route path="/play" component={Play} />
                </Switch>

            </section>
        </Router>
    )
}
