import React from 'react';
import './Track.css';

function Track({track, handleTrack}) {
    const id = 'track_' + Date.now();

    return (
        <div className='Track' id={id} key={id} onClick={handleTrack} track={track}>
            <p className='Artist' >{ track.artists[0].name.substring(0,20) }</p>
            <p className='Album' >{ track.album.name.substring(0,40) }</p>
            <p className='TrackName' >{ track.name.substring(0,40) } </p>
            <input type="button" className='AddToPlayList' value="+"  onClick={handleTrack} ></input>
        </div>
    )
 }

export default Track; 