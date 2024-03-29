/* 
    File:        TrackList.js 
    Project:     CodeCademy Jammming 
    Author:      wjlwjl07aa      
    Create Date: Feb. 12, 2024
    Description: Component for rendering tracks returned from a Spotify search. 
                 Displays a list of <Track /> components 
                 Passes handleTrack through to <Track /> items (add to play list)
*/

import React from 'react';
import Track from './Track';
import './TrackList.css'; 

function TrackList({tracks, handleTrack}) {
    const items = 
        tracks ? 
            tracks.map( (x,i) => {
                const key = 'track_' + i; 
                return( <Track track={x} key={key} handleTrack={handleTrack} /> );
            }) :  null;

    return( 
        <div className = 'TrackList' id='TrackList'>
            <div className='tl-heading'>
                <p className='tl-col1'>Artist</p>
                <p className='tl-col2'>Album</p>
                <p className='tl-col3'>Track</p>
             </div> 
             <div className='tl-items'>
                { items || 'No Tracks Found'}
            </div>
        </div>
    );
}

export default TrackList;