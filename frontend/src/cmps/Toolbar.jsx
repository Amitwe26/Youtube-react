import React from 'react'
import { Link } from 'react-router-dom'
import HomeIcon from '@material-ui/icons/Home';
import HistoryIcon from '@material-ui/icons/History';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
export function Toolbar({ setFavoritesList }) {
    return (
        <div className="modal-bar">
            <Link className="options" to="/"><HomeIcon /><span>Home</span></Link>
            <Link className="options" to=""><VideoLibraryIcon /><span>Library</span></Link>
            <Link className="options" to=""><HistoryIcon /><span>History</span></Link>
            <Link className="options" to="/favorites"><StarBorderIcon /><span>Favorites</span></Link>
            <Link className="options" to="/play"><PlayArrowIcon /><span>Last video</span></Link>
        </div>
    )
}
